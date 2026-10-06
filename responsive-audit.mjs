import { spawn } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const appUrl = 'http://127.0.0.1:4179'
const debugPort = 9333
const browserCandidates = process.platform === 'win32'
  ? [
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    ]
  : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']
const browserPath = browserCandidates.find(existsSync)

if (!browserPath) throw new Error('Chrome ou Edge não encontrado para a auditoria.')

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))

async function waitFor(url, attempts = 80) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return response
    } catch {}
    await wait(100)
  }
  throw new Error(`Tempo esgotado aguardando ${url}`)
}

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url)
    this.nextId = 1
    this.pending = new Map()
    this.errors = []
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true })
      this.socket.addEventListener('error', reject, { once: true })
    })
    this.socket.addEventListener('message', event => {
      const message = JSON.parse(event.data)
      if (message.id) {
        const request = this.pending.get(message.id)
        if (!request) return
        this.pending.delete(message.id)
        if (message.error) request.reject(new Error(message.error.message))
        else request.resolve(message.result)
        return
      }
      if (message.method === 'Runtime.exceptionThrown') this.errors.push(message.params.exceptionDetails.text)
      if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') this.errors.push(message.params.entry.text)
      if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
        this.errors.push(message.params.args.map(argument => argument.value ?? argument.description).join(' '))
      }
    })
  }

  send(method, params = {}) {
    const id = this.nextId
    this.nextId += 1
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject })
      this.socket.send(JSON.stringify({ id, method, params }))
    })
  }

  async evaluate(expression) {
    const response = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text)
    return response.result.value
  }

  close() {
    this.socket.close()
  }
}

const topicIds = [
  'inicio', 'abertura', 'prompts', 'modelos', 'regras', 'fluxo', 'revisao', 'tokens',
  'mapa', 'rag', 'embeddings', 'mcp', 'contexto', 'arquitetura', 'frentes', 'tecnicas', 'aprovacao',
  'avaliacao', 'incerteza', 'falhas', 'observabilidade', 'governanca', 'adequacao', 'seguranca', 'aplicacao', 'caso-final', 'bastidores', 'fechamento',
]
const groupCounts = { fundamentos: 7, arquiteturas: 9, qualidade: 7, pratica: 2, encerramento: 2 }
const viewports = [
  { width: 320, height: 700, label: 'celular 320' },
  { width: 339, height: 760, label: 'celular 339' },
  { width: 768, height: 1024, label: 'tablet 768' },
  { width: 1024, height: 768, label: 'tablet horizontal 1024' },
]

const interactionChecks = [
  ['fluxo', `(() => { const cases = document.querySelectorAll('.workflow-case-tabs button'); cases[cases.length - 1]?.click(); const phases = document.querySelectorAll('.workflow-phases button'); phases[phases.length - 1]?.click() })()`, `document.querySelectorAll('.workflow-case-tabs .selected').length === 1 && document.querySelectorAll('.workflow-phases .selected').length === 1`],
  ['tokens', `(() => { const textarea = document.querySelector('#token-prompt'); const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; setter.call(textarea, 'Explique o erro de validação.'); textarea.dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('.generate-button')?.click() })()`, `Boolean(document.querySelector('.response-preview')?.textContent) && Boolean(document.querySelector('.token-more .detail[open]')) && (() => { const detail = document.querySelector('.token-section > .detail'); const lab = document.querySelector('.token-playground'); return Boolean(detail && lab && lab.getBoundingClientRect().top - detail.getBoundingClientRect().bottom >= 16) })()`],
  ['mapa', `(() => { const scenarios = document.querySelectorAll('.decision-scenarios button'); scenarios[scenarios.length - 1]?.click(); document.querySelector('.decision-options button')?.click() })()`, `Boolean(document.querySelector('.decision-feedback'))`],
  ['rag', `document.querySelector('.rag-search-button')?.click()`, `Boolean(document.querySelector('.rag-lab-results'))`],
  ['embeddings', `(() => { const sizes = document.querySelectorAll('.chunking-controls fieldset button'); sizes[sizes.length - 1]?.click(); document.querySelector('.chunking-controls input')?.click() })()`, `document.querySelectorAll('.chunk-list article').length > 0`],
  ['arquitetura', `(() => { const tabs = document.querySelectorAll('.architecture-tabs button'); tabs[tabs.length - 1]?.click() })()`, `document.querySelectorAll('.architecture-tabs .selected').length === 1`],
  ['frentes', `(async () => { const tabs = document.querySelectorAll('.development-quiz .choice-lab-tabs button'); tabs[tabs.length - 1]?.click(); await new Promise(requestAnimationFrame); document.querySelector('.development-quiz .choice-lab-options button')?.click(); await new Promise(requestAnimationFrame); document.querySelector('.development-quiz .choice-lab-reveal')?.click() })()`, `Boolean(document.querySelector('.development-quiz .evaluation-result'))`],
  ['tecnicas', `(() => { const tabs = document.querySelectorAll('.technique-tabs button'); tabs[tabs.length - 1]?.click(); document.querySelector('.technique-options button')?.click() })()`, `Boolean(document.querySelector('.technique-feedback'))`],
  ['aprovacao', `(() => { const tabs = document.querySelectorAll('.review-scenario-tabs button'); tabs[tabs.length - 1]?.click(); document.querySelector('.review-decision-options button')?.click() })()`, `Boolean(document.querySelector('.review-decision-feedback'))`],
  ['avaliacao', `document.querySelector('.evaluation-options button')?.click()`, `Boolean(document.querySelector('.evaluation-reveal:not(:disabled)'))`],
  ['falhas', `(() => { const tabs = document.querySelectorAll('.failure-selector button'); tabs[tabs.length - 1]?.click() })()`, `document.querySelectorAll('.failure-selector .selected').length === 1`],
  ['seguranca', `(() => { const options = document.querySelectorAll('.trust-options button'); options[options.length - 1]?.click() })()`, `Boolean(document.querySelector('.trust-feedback'))`],
  ['adequacao', `(async () => { const tabs = document.querySelectorAll('.risk-fit-quiz .choice-lab-tabs button'); tabs[tabs.length - 1]?.click(); await new Promise(requestAnimationFrame); document.querySelector('.risk-fit-quiz .choice-lab-options button')?.click(); await new Promise(requestAnimationFrame); document.querySelector('.risk-fit-quiz .choice-lab-reveal')?.click() })()`, `Boolean(document.querySelector('.risk-fit-quiz .evaluation-result'))`],
  ['caso-final', `(async () => { const tabs = document.querySelectorAll('.capstone-quiz .choice-lab-tabs button'); tabs[tabs.length - 1]?.click(); await new Promise(requestAnimationFrame); document.querySelector('.capstone-quiz .choice-lab-options button')?.click(); await new Promise(requestAnimationFrame); document.querySelector('.capstone-quiz .choice-lab-reveal')?.click() })()`, `Boolean(document.querySelector('.capstone-quiz .evaluation-result'))`],
  ['bastidores', `(() => { const options = document.querySelectorAll('.story-selector button'); options[options.length - 1]?.click() })()`, `document.querySelectorAll('.story-selector .selected').length === 1`],
]

const preview = process.platform === 'win32'
  ? spawn('cmd.exe', ['/d', '/s', '/c', 'npm run preview -- --host 127.0.0.1 --port 4179 --strictPort'], { cwd: process.cwd(), stdio: 'ignore', windowsHide: true })
  : spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4179', '--strictPort'], { cwd: process.cwd(), stdio: 'ignore' })
const profileDirectory = mkdtempSync(join(tmpdir(), 'ia-responsive-audit-'))
const browser = spawn(browserPath, [
  '--headless=new',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profileDirectory}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  'about:blank',
], { stdio: 'ignore', windowsHide: true })

let client
const failures = []

function assert(condition, message) {
  if (!condition) failures.push(message)
}

try {
  await waitFor(appUrl)
  await waitFor(`http://127.0.0.1:${debugPort}/json/version`)
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json()
  const page = targets.find(target => target.type === 'page')
  client = new CdpClient(page.webSocketDebuggerUrl)
  await client.connect()
  await client.send('Page.enable')
  await client.send('Runtime.enable')
  await client.send('Log.enable')

  for (const viewport of viewports) {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.width <= 820,
      screenWidth: viewport.width,
      screenHeight: viewport.height,
    })
    await client.send('Emulation.setTouchEmulationEnabled', { enabled: viewport.width <= 820, maxTouchPoints: 5 })
    await client.send('Page.navigate', { url: appUrl })
    await wait(300)

    const shellReady = await client.evaluate(`Boolean(document.querySelector('.app-shell') && document.querySelector('.content section'))`)
    assert(shellReady, `${viewport.label}: aplicação não carregou`)

    if (viewport.width <= 820) {
      for (const [groupId, expectedCount] of Object.entries(groupCounts)) {
        await client.evaluate(`(() => {
          const trigger = document.querySelector('.mobile-nav-groups [data-group-id="${groupId}"]');
          if (trigger?.getAttribute('aria-expanded') !== 'true') trigger?.click();
        })()`)
        await wait(30)
        const state = await client.evaluate(`(() => {
          const trigger = document.querySelector('.mobile-nav-groups [data-group-id="${groupId}"]');
          const panel = document.querySelector('.mobile-subtopics');
          const rect = panel?.getBoundingClientRect();
          return { expanded: trigger?.getAttribute('aria-expanded'), hidden: panel?.hidden, count: panel?.querySelectorAll('.topic-button').length, width: rect?.width, height: rect?.height };
        })()`)
        assert(state.expanded === 'true' && state.hidden === false, `${viewport.label}: grupo ${groupId} não abriu`)
        assert(state.count === expectedCount, `${viewport.label}: grupo ${groupId} exibiu ${state.count}/${expectedCount} subtópicos`)
        assert(state.width > 0 && state.height > 0, `${viewport.label}: subtópicos de ${groupId} sem área visível`)
      }
    } else {
      for (const [groupId, expectedCount] of Object.entries(groupCounts)) {
        await client.evaluate(`(() => {
          const trigger = document.querySelector('.nav-desktop [data-group-id="${groupId}"]');
          if (trigger?.getAttribute('aria-expanded') !== 'true') trigger?.click();
        })()`)
        await wait(30)
        const state = await client.evaluate(`(() => {
          const trigger = document.querySelector('.nav-desktop [data-group-id="${groupId}"]');
          const panel = document.querySelector('#nav-items-${groupId}');
          return { expanded: trigger?.getAttribute('aria-expanded'), hidden: panel?.hidden, count: panel?.querySelectorAll('.topic-button').length };
        })()`)
        assert(state.expanded === 'true' && state.hidden === false, `${viewport.label}: grupo desktop ${groupId} não abriu`)
        assert(state.count === expectedCount, `${viewport.label}: grupo desktop ${groupId} exibiu ${state.count}/${expectedCount} subtópicos`)
      }
    }

    const sidebarFocusRule = await client.evaluate(`Array.from(document.styleSheets).some(sheet => Array.from(sheet.cssRules).some(rule => rule.selectorText?.includes('.sidebar button:focus') && rule.style?.boxShadow?.includes('inset')))`)
    assert(sidebarFocusRule, `${viewport.label}: regra de foco interno da navegação ausente`)

    for (const topicId of topicIds) {
      await client.evaluate(`document.querySelector('.nav-desktop [data-topic-id="${topicId}"]')?.click()`)
      await wait(30)
      await client.evaluate(`document.querySelectorAll('.content details:not([open]) > summary').forEach(summary => summary.click())`)
      await wait(15)
      const state = await client.evaluate(`(() => {
        const root = document.documentElement;
        const body = document.body;
        const content = document.querySelector('.content');
        const section = content?.querySelector('section');
        return {
          section: Boolean(section),
          active: document.querySelectorAll('[data-topic-id="${topicId}"][aria-current="step"]').length,
          overflow: Math.max(root.scrollWidth, body.scrollWidth) - window.innerWidth,
          contentWidth: content?.getBoundingClientRect().width ?? 0,
          closedDetails: document.querySelectorAll('.content details:not([open])').length,
          tableOverflow: Math.max(0, ...Array.from(document.querySelectorAll('.content .table-wrap')).map(table => table.scrollWidth - table.clientWidth)),
        };
      })()`)
      assert(state.section, `${viewport.label}/${topicId}: seção ausente`)
      assert(state.active >= 1, `${viewport.label}/${topicId}: navegação não marcou tópico ativo`)
      assert(state.overflow <= 1, `${viewport.label}/${topicId}: overflow horizontal de ${state.overflow}px no documento`)
      assert(state.contentWidth > 0, `${viewport.label}/${topicId}: conteúdo sem largura`)
      assert(state.closedDetails === 0, `${viewport.label}/${topicId}: painel expansível não abriu pelo clique`)
      if (viewport.width <= 680) assert(state.tableOverflow <= 1, `${viewport.label}/${topicId}: tabela exige rolagem lateral de ${state.tableOverflow}px`)

      if (process.env.AUDIT_SCREENSHOT && viewport.width === 339 && topicId === 'modelos') {
        await client.evaluate(`document.querySelectorAll('.detail')[1]?.scrollIntoView({ block: 'start' })`)
        await wait(80)
        const screenshot = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
        writeFileSync(process.env.AUDIT_SCREENSHOT, Buffer.from(screenshot.data, 'base64'))
      }
    }

    if (viewport.width === 339 || viewport.width === 768) {
      for (const [topicId, action, check] of interactionChecks) {
        await client.evaluate(`document.querySelector('.nav-desktop [data-topic-id="${topicId}"]')?.click()`)
        await wait(30)
        try {
          await client.evaluate(action)
        } catch (error) {
          failures.push(`${viewport.label}/${topicId}: ${error.message}`)
        }
        await wait(30)
        const passed = await client.evaluate(check)
        assert(passed, `${viewport.label}/${topicId}: interação principal não respondeu`)
      }

      const themeBefore = await client.evaluate(`document.documentElement.dataset.theme`)
      await client.evaluate(`document.querySelector('.theme-button')?.click()`)
      await wait(30)
      const themeChanged = await client.evaluate(`document.documentElement.dataset.theme !== '${themeBefore}'`)
      assert(themeChanged, `${viewport.label}: alternância de tema não respondeu`)
    }

    const drawerBefore = await client.evaluate(`(() => ({
      contentWidth: document.querySelector('.content')?.getBoundingClientRect().width ?? 0,
      closeButton: Boolean(document.querySelector('.sidebar-drawer-close')),
      expanded: document.querySelector('.sidebar-drawer-close')?.getAttribute('aria-expanded'),
    }))()`)
    assert(drawerBefore.closeButton && drawerBefore.expanded === 'true', `${viewport.label}: controle para recolher o drawer ausente`)
    await client.evaluate(`document.querySelector('.sidebar-drawer-close')?.click()`)
    await wait(260)
    const drawerClosed = await client.evaluate(`(() => {
      const shell = document.querySelector('.app-shell');
      const sidebar = document.querySelector('.sidebar');
      const opener = document.querySelector('.sidebar-drawer-open');
      return {
        collapsed: shell?.classList.contains('drawer-collapsed'),
        hidden: sidebar?.getAttribute('aria-hidden'),
        concealed: sidebar ? ['none', 'hidden'].includes(getComputedStyle(sidebar).display === 'none' ? 'none' : getComputedStyle(sidebar).visibility) : false,
        opener: Boolean(opener),
        openerFocused: document.activeElement === opener,
        contentWidth: document.querySelector('.content')?.getBoundingClientRect().width ?? 0,
        overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth,
      };
    })()`)
    assert(drawerClosed.collapsed && drawerClosed.hidden === 'true' && drawerClosed.concealed, `${viewport.label}: drawer não foi recolhido`)
    assert(drawerClosed.opener && drawerClosed.openerFocused, `${viewport.label}: controle de reabertura não recebeu foco`)
    assert(drawerClosed.overflow <= 1, `${viewport.label}: drawer recolhido criou overflow de ${drawerClosed.overflow}px`)
    if (viewport.width > 820) assert(drawerClosed.contentWidth >= drawerBefore.contentWidth + 200, `${viewport.label}: conteúdo não ocupou a largura liberada`)

    await client.evaluate(`document.querySelector('.sidebar-drawer-open')?.click()`)
    await wait(30)
    const drawerReopened = await client.evaluate(`!document.querySelector('.app-shell')?.classList.contains('drawer-collapsed') && document.querySelector('.sidebar')?.getAttribute('aria-hidden') === 'false' && document.activeElement === document.querySelector('.sidebar-drawer-close')`)
    assert(drawerReopened, `${viewport.label}: drawer não reabriu com foco no controle interno`)
    await client.evaluate(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))`)
    await wait(30)
    const escaped = await client.evaluate(`document.querySelector('.app-shell')?.classList.contains('drawer-collapsed')`)
    assert(escaped, `${viewport.label}: tecla Escape não recolheu o drawer`)
    await client.evaluate(`document.querySelector('.sidebar-drawer-open')?.click()`)
    await wait(30)
  }

  assert(client.errors.length === 0, `Erros de navegador: ${client.errors.join(' | ')}`)

  if (failures.length) {
    console.error(JSON.stringify({ status: 'failed', failures }, null, 2))
    process.exitCode = 1
  } else {
    console.log(JSON.stringify({ status: 'passed', viewports: viewports.map(item => item.label), topics: topicIds.length, interactions: interactionChecks.length, drawer: 'open/close/Escape' }, null, 2))
  }
} finally {
  client?.close()
  preview.kill()
  browser.kill()
  await wait(100)
  rmSync(profileDirectory, { recursive: true, force: true })
}

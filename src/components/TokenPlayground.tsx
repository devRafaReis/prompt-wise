import { useState } from 'react'
import { answerInstructions, exampleFile, exampleHistory, exampleResponseChunks, exampleTool, extraContext, tokenExamples, type AnswerLength } from '../data/tokenDemo'
import { TextArea } from './GuideUI'

function textPieces(value: string): string[] {
  return value.match(/\s+|[\p{L}\p{M}]+|\d+|[^\s]/gu) ?? []
}

function visualEstimate(value: string): number {
  return value ? Math.ceil(Array.from(value).length / 4) : 0
}

function visiblePiece(piece: string): { text: string; label?: string } {
  if (!/^\s+$/.test(piece)) return { text: piece }
  if (piece.includes('\n')) return { text: '↵', label: 'quebra de linha' }
  if (piece.includes('\t')) return { text: '⇥', label: 'tabulação' }
  return { text: '␠', label: 'espaço em branco' }
}

export default function TokenPlayground() {
  const [prompt, setPrompt] = useState<string>(tokenExamples[0].prompt)
  const [answerLength, setAnswerLength] = useState<AnswerLength>('curta')
  const [withContext, setWithContext] = useState(false)
  const [withHistory, setWithHistory] = useState(false)
  const [withFile, setWithFile] = useState(false)
  const [withTool, setWithTool] = useState(false)
  const [visibleChunks, setVisibleChunks] = useState(0)

  const instructions = answerInstructions[answerLength]
  const input = [withContext ? extraContext : '', withFile ? exampleFile : '', prompt.trim()].filter(Boolean).join('\n\n')
  const inputMessages = [...(withHistory ? exampleHistory : []), { role: 'user', content: input }]
  const requestPayload = JSON.stringify({ model: 'gpt-6.1-sol', instructions, input: inputMessages, ...(withTool ? { tools: [exampleTool] } : {}) }, null, 2)
  const chunks = exampleResponseChunks(prompt, answerLength)
  const visibleAnswer = chunks.slice(0, visibleChunks).join('')
  const pieces = textPieces(prompt)
  const inputParts = [
    { label: 'Instruções', value: instructions },
    { label: 'Sua frase', value: prompt.trim() },
    ...(withContext ? [{ label: 'Regras do projeto', value: extraContext }] : []),
    ...(withHistory ? [{ label: 'Histórico', value: exampleHistory.map(item => item.content).join('\n') }] : []),
    ...(withFile ? [{ label: 'Trecho de arquivo', value: exampleFile }] : []),
    ...(withTool ? [{ label: 'Definição da ferramenta', value: JSON.stringify(exampleTool) }] : []),
  ].map(part => ({ ...part, estimate: visualEstimate(part.value) }))
  const inputEstimate = inputParts.reduce((total, part) => total + part.estimate, 0)

  function changePrompt(value: string) {
    setPrompt(value)
    setVisibleChunks(0)
  }

  return <div className="token-playground">
    <div className="playground-heading"><div><p className="eyebrow">Laboratório interativo</p><h2>Escreva uma pergunta e acompanhe o caminho dela</h2></div><span>Simulação local · nenhuma consulta é enviada</span></div>
    <div className="playground-grid">
      <div className="playground-panel">
        <div className="playground-step"><b>01</b><span>Monte a entrada</span></div>
        <label className="playground-label" htmlFor="token-prompt">O que você quer perguntar?</label>
        <TextArea id="token-prompt" value={prompt} onChange={event => changePrompt(event.target.value)} maxLength={400} rows={3} placeholder="Ex.: Explique este erro em uma frase." />
        <div className="prompt-presets" aria-label="Exemplos de perguntas">{tokenExamples.map(example => <button key={example.label} type="button" onClick={() => changePrompt(example.prompt)}>{example.label}</button>)}</div>
        <div className="playground-controls">
          <label className="format-field">Formato da resposta<select value={answerLength} onChange={event => { setAnswerLength(event.target.value as AnswerLength); setVisibleChunks(0) }}><option value="curta">Uma frase</option><option value="detalhada">Explicação + exemplo</option></select></label>
          <fieldset className="input-addons"><legend>Acrescente à consulta</legend>
            <label className="context-toggle"><input type="checkbox" checked={withContext} onChange={event => { setWithContext(event.target.checked); setVisibleChunks(0) }} /><span>Regras do projeto</span></label>
            <label className="context-toggle"><input type="checkbox" checked={withHistory} onChange={event => { setWithHistory(event.target.checked); setVisibleChunks(0) }} /><span>Histórico</span></label>
            <label className="context-toggle"><input type="checkbox" checked={withFile} onChange={event => { setWithFile(event.target.checked); setVisibleChunks(0) }} /><span>Trecho de arquivo</span></label>
            <label className="context-toggle"><input type="checkbox" checked={withTool} onChange={event => { setWithTool(event.target.checked); setVisibleChunks(0) }} /><span>Ferramenta</span></label>
          </fieldset>
        </div>
        <div className="fragment-card"><div className="fragment-heading"><strong>Sua frase em partes visuais</strong><small>{pieces.length} fragmentos didáticos</small></div><div className="fragment-list">{pieces.slice(0, 24).map((piece, index) => { const display = visiblePiece(piece); return <span key={`${index}-${piece}`} className={display.label ? 'space-piece' : ''} aria-label={display.label} title={display.label}>{display.text}</span> })}{pieces.length > 24 && <span>+{pieces.length - 24}</span>}</div><small>␠ = espaço; ↵ = quebra de linha. Os blocos não são tokens reais.</small></div>
      </div>
      <div className="playground-panel playground-result">
        <div className="playground-step"><b>02</b><span>Veja a consulta</span></div>
        <p className="playground-explain">Instruções, mensagens e ferramentas disponíveis compõem a entrada. A prévia abaixo não é enviada.</p>
        <pre className="request-preview">{requestPayload}</pre>
        <div className="playground-step second-step"><b>03</b><span>Acompanhe a saída</span></div>
        <div className="response-preview" aria-live="polite">{visibleChunks ? visibleAnswer : <span>Use o botão abaixo para revelar uma resposta ilustrativa em partes.</span>}</div>
        <div className="generation-actions"><button type="button" className="generate-button" disabled={!prompt.trim() || visibleChunks >= chunks.length} onClick={() => setVisibleChunks(count => count + 1)}>{visibleChunks === 0 ? 'Gerar primeiro trecho' : 'Gerar próximo trecho'} →</button><button type="button" className="reset-generation" disabled={visibleChunks === 0} onClick={() => setVisibleChunks(0)}>Reiniciar</button><small>{visibleChunks} de {chunks.length} trechos</small></div>
        <p className="playground-caveat">A resposta de exemplo não muda com os anexos; em uma consulta real, o contexto pode mudar o resultado.</p>
      </div>
    </div>
    <div className="token-analysis">
      <div className="token-usage-strip"><div><span>Entrada estimada</span><strong>≈ {inputEstimate}</strong><small>unidades de texto*</small></div><div><span>Saída revelada</span><strong>≈ {visualEstimate(visibleAnswer)}</strong><small>unidades de texto*</small></div><div><span>Uso real da API</span><strong>—</strong><small>somente após uma chamada real</small></div><p>*Comparação grosseira de 4 caracteres por unidade; não é contagem de tokens. Não inclui todos os detalhes de formatação da requisição e pode errar bastante em português, código, arquivos e ferramentas. O uso real de saída pode incluir conteúdo não visível.</p></div>
      <div className="token-explainer">
        <div className="input-breakdown"><div className="fragment-heading"><strong>De onde vem a entrada estimada</strong><small>Ative as opções para comparar</small></div><div className="input-breakdown-bar" aria-hidden="true">{inputParts.filter(part => part.estimate > 0).map((part, index) => <span key={part.label} className={`input-part-${index % 6}`} style={{ flexGrow: part.estimate }} />)}</div><ul>{inputParts.map(part => <li key={part.label}><span>{part.label}</span><strong>≈ {part.estimate}</strong></li>)}</ul></div>
        <div className="context-window-note"><div><strong>Janela de contexto não é memória ilimitada</strong><p>Em uma chamada real, entrada, saída e, quando aplicável, raciocínio compartilham um limite que depende do modelo. Enviar histórico ou arquivos extensos reduz o espaço disponível; escolha trechos relevantes.</p></div><span>Entrada <b>+</b> saída <b>+</b> raciocínio*</span><small>*Conforme o modelo. Esta demonstração não mostra o limite de um modelo real. <a href="https://developers.openai.com/api/docs/guides/conversation-state" target="_blank" rel="noreferrer">OpenAI Docs</a></small></div>
      </div>
    </div>
  </div>
}

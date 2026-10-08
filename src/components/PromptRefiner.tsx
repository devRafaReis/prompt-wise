import { useMemo, useState } from 'react'
import { CopyButton, Icon, PromptBox, TextArea } from './GuideUI'
import { promptChecks, promptRefinerIntro, promptRefinerTemplate, sensitiveDataPattern, type PromptAgentFeedback } from '../data/promptRefiner'

type RefinementResponse = { feedback?: PromptAgentFeedback; error?: string }

export default function PromptRefiner() {
  const [prompt, setPrompt] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isRefining, setIsRefining] = useState(false)
  const [agentFeedback, setAgentFeedback] = useState<PromptAgentFeedback | null>(null)
  const [agentError, setAgentError] = useState<string | null>(null)

  const analysis = useMemo(() => {
    const value = prompt.trim()
    return {
      hasText: value.length > 0,
      completed: promptChecks.filter(check => check.patterns.some(pattern => pattern.test(value))),
      containsSensitiveData: sensitiveDataPattern.test(value),
    }
  }, [prompt])

  const missing = promptChecks.filter(check => !analysis.completed.some(item => item.id === check.id))
  const completion = analysis.hasText ? `${analysis.completed.length} de ${promptChecks.length} elementos identificados` : 'Escreva um prompt para começar'

  async function analyzePrompt() {
    setSubmitted(true)
    setAgentFeedback(null)
    setAgentError(null)

    if (analysis.containsSensitiveData) return

    setIsRefining(true)
    try {
      const response = await fetch('/api/refinar-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })
      const isJson = response.headers.get('content-type')?.includes('application/json')
      const result = isJson ? await response.json() as RefinementResponse : {}
      if (!response.ok || !result.feedback) throw new Error(result.error ?? 'Não foi possível gerar a sugestão agora.')
      setAgentFeedback(result.feedback)
    } catch (error) {
      setAgentError(error instanceof Error ? error.message : 'Não foi possível gerar a sugestão agora.')
    } finally {
      setIsRefining(false)
    }
  }

  function updatePrompt(value: string) {
    setPrompt(value)
    setSubmitted(false)
    setAgentFeedback(null)
    setAgentError(null)
  }

  return <section className="prompt-refiner" aria-labelledby="prompt-refiner-title">
    <header>
      <div>
        <p className="eyebrow">Prática guiada</p>
        <h2 id="prompt-refiner-title">Revise seu prompt antes de enviar</h2>
      </div>
      <span>{completion}</span>
    </header>
    <p className="prompt-refiner-intro">{promptRefinerIntro}</p>
    <label className="prompt-refiner-field" htmlFor="prompt-to-refine">Seu rascunho de prompt</label>
    <TextArea id="prompt-to-refine" value={prompt} onChange={event => updatePrompt(event.target.value)} placeholder="Ex.: crie uma tela de login..." aria-describedby="prompt-refiner-help" />
    <p id="prompt-refiner-help" className="prompt-refiner-help">Não cole chaves, senhas, dados pessoais ou informações confidenciais.</p>
    <div className="prompt-refiner-actions">
      <button type="button" className="prompt-refiner-analyze" onClick={analyzePrompt} disabled={!analysis.hasText || isRefining}>{isRefining ? 'Consultando assistente...' : 'Checar e pedir sugestão'}</button>
      <CopyButton value={promptRefinerTemplate} label="Copiar modelo guiado" />
    </div>
    {submitted && <div className="prompt-refiner-result" aria-live="polite">
      {analysis.containsSensitiveData && <div className="prompt-refiner-alert" role="status"><Icon name="warning" size={18} /><p><strong>Possível dado sensível identificado.</strong> Remova ou substitua o trecho por um marcador, como <code>[SEGREDO_REMOVIDO]</code>, antes de pedir uma sugestão ao assistente.</p></div>}
      <div className="prompt-check-list" aria-label="Elementos identificados no prompt">{promptChecks.map(check => {
        const found = analysis.completed.some(item => item.id === check.id)
        return <div key={check.id} className={found ? 'found' : 'missing'}><Icon name={found ? 'check' : 'warning'} size={16} /><div><strong>{check.label}</strong><p>{found ? check.description : `Falta esclarecer: ${check.question}`}</p></div></div>
      })}</div>
      <div className="prompt-refiner-next"><strong>{missing.length === 0 ? 'Próximo passo: revise a resposta com os critérios definidos.' : 'Perguntas que podem melhorar o pedido'}</strong>{missing.length === 0 ? <p>Mesmo um prompt completo não substitui verificar código, fontes, segurança e resultados.</p> : <ol>{missing.map(check => <li key={check.id}>{check.question}</li>)}</ol>}</div>
      {isRefining && <p className="prompt-agent-loading" role="status"><Icon name="clock" size={16} />O assistente está preparando uma sugestão.</p>}
      {agentError && <p className="prompt-agent-error" role="alert"><Icon name="warning" size={16} />{agentError}</p>}
      {agentFeedback && <section className="prompt-agent-feedback" aria-labelledby="prompt-agent-feedback-title">
        <header><Icon name="spark" size={19} /><div><p className="eyebrow">Resposta do assistente</p><h3 id="prompt-agent-feedback-title">Sugestão para o seu rascunho</h3></div></header>
        <p>{agentFeedback.resumo}</p>
        {agentFeedback.perguntas.length > 0 && <div><h4>Perguntas para responder antes de enviar</h4><ol>{agentFeedback.perguntas.map(question => <li key={question}>{question}</li>)}</ol></div>}
        <div><h4>Prompt sugerido</h4><PromptBox onCopy={agentFeedback.promptSugerido}>{agentFeedback.promptSugerido}</PromptBox></div>
        {agentFeedback.cuidado && <p className="prompt-agent-caution"><Icon name="shield" size={16} /><span>{agentFeedback.cuidado}</span></p>}
      </section>}
      <p className="source-note prompt-agent-source">Quando configurado, este laboratório usa a Responses API no servidor com <code>gpt-6-luna</code>. <a href="https://developers.openai.com/api/docs/models/gpt-6-luna" target="_blank" rel="noreferrer">Consultar documentação oficial</a>.</p>
    </div>}
  </section>
}

import { useState } from 'react'
import { agentLoopSteps, trustFeedback, untrustedLog } from '../data/agentLoop'

export function AgentLoopDemo() {
  const [index, setIndex] = useState(0)
  const [decision, setDecision] = useState<'approved' | 'denied' | null>(null)
  const step = agentLoopSteps[index]

  return <div className="agent-loop-demo">
    <p className="demo-disclaimer">Simulação local: nenhuma ferramenta é chamada e nenhum arquivo é alterado.</p>
    <div className="agent-stepper" role="group" aria-label="Etapas do trabalho com um agente">{agentLoopSteps.map((item, stepIndex) => <button key={item.title} type="button" aria-pressed={index === stepIndex} disabled={stepIndex === agentLoopSteps.length - 1 && decision === null} className={index === stepIndex ? 'selected' : ''} onClick={() => setIndex(stepIndex)}><b>{String(stepIndex + 1).padStart(2, '0')}</b><span>{item.actor}</span></button>)}</div>
    <article className="agent-step-card" aria-live="polite"><div><small>{String(index + 1).padStart(2, '0')} · {step.actor}</small><h3>{step.title}</h3></div><p className="agent-step-detail">{index === 4 && decision === 'denied' ? 'Você não autorizou a mudança. O agente pode explicar o plano, mas esta simulação não prossegue com edição.' : index === 4 && decision === 'approved' ? 'Você autorizou continuar nesta simulação. Em um projeto real, ainda seria preciso executar a ferramenta e verificar o diff e o comportamento.' : step.detail}</p><p>{step.explanation}</p>
      {index === 3 && <div className="agent-approval" role="group" aria-label="Decisão sobre a alteração"><button type="button" aria-pressed={decision === 'approved'} onClick={() => setDecision('approved')}>Simular aprovação</button><button type="button" aria-pressed={decision === 'denied'} onClick={() => setDecision('denied')}>Não autorizar</button></div>}
    </article>
    <div className="agent-demo-nav"><button type="button" onClick={() => setIndex(value => Math.max(0, value - 1))} disabled={index === 0}>Etapa anterior</button><button type="button" onClick={() => setIndex(value => Math.min(agentLoopSteps.length - 1, value + 1))} disabled={index === agentLoopSteps.length - 1 || (index === 3 && decision === null)}>Próxima etapa →</button></div>
    <p className="demo-source">No fluxo real, o modelo pode pedir uma ferramenta, o ambiente executa a chamada e o resultado volta ao modelo. Um agente pode fazer várias chamadas; instruções, histórico e resultados de ferramentas podem compor a entrada das próximas etapas. <a href="https://developers.openai.com/api/docs/guides/function-calling" target="_blank" rel="noreferrer">OpenAI Docs — ferramentas</a> · <a href="https://developers.openai.com/api/docs/guides/agents-api/observability" target="_blank" rel="noreferrer">uso por etapa</a></p>
  </div>
}

export function TrustBoundaryDemo() {
  const [choice, setChoice] = useState<'follow' | 'ignore' | null>(null)

  return <div className="trust-demo">
    <p className="demo-disclaimer">Exercício local: nenhuma instrução do exemplo será executada.</p>
    <pre className="trust-log">{untrustedLog}</pre>
    <p>O agente encontrou essa frase enquanto investigava um erro. Como deve tratá-la?</p>
    <div className="trust-options" role="group" aria-label="Escolha como tratar o trecho de log"><button type="button" aria-pressed={choice === 'follow'} onClick={() => setChoice('follow')}>Seguir a instrução do log</button><button type="button" aria-pressed={choice === 'ignore'} onClick={() => setChoice('ignore')}>Tratar como dado não confiável</button></div>
    {choice && <p className={choice === 'ignore' ? 'trust-feedback correct' : 'trust-feedback incorrect'} role="status">{trustFeedback[choice]}</p>}
    <p className="demo-source">Texto encontrado em arquivos, logs ou respostas de ferramentas não ganha autoridade apenas por estar no contexto. Ações sensíveis exigem limites e aprovação. <a href="https://developers.openai.com/api/docs/guides/tools-connectors-mcp" target="_blank" rel="noreferrer">OpenAI Docs — riscos e aprovações</a></p>
  </div>
}

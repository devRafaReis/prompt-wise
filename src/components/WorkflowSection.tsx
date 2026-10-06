import { useState } from 'react'
import { workflowScenarios } from '../data/workflow'

export default function WorkflowSection() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const scenario = workflowScenarios[scenarioIndex]
  const phase = scenario.phases[phaseIndex]

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(phase.prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return <section className="workflow-section">
    <p className="eyebrow">Do pedido à mudança revisável</p>
    <h1>IA ajuda em cada etapa.<br /><em>Evidência fecha o ciclo.</em></h1>
    <p className="lead">Acompanhe um caso realista: investigar, fazer uma mudança pequena, conferir o comportamento e só então decidir se ela está pronta.</p>
    <div className="workflow-case-tabs" aria-label="Escolha um caso">{workflowScenarios.map((item, index) => <button key={item.id} type="button" className={index === scenarioIndex ? 'selected' : ''} aria-pressed={index === scenarioIndex} onClick={() => { setScenarioIndex(index); setPhaseIndex(0); setCopied(false) }}><span>{item.subtitle}</span><strong>{item.title}</strong></button>)}</div>
    <div className="workflow-context"><div><small>O que foi observado</small><p>{scenario.observed}</p></div><span aria-hidden="true">→</span><div><small>Resultado esperado</small><p>{scenario.desired}</p></div></div>
    <div className="workflow-board"><div className="workflow-phases" role="group" aria-label="Etapas do caso">{scenario.phases.map((item, index) => <button key={item.title} type="button" className={index === phaseIndex ? 'selected' : ''} aria-current={index === phaseIndex ? 'step' : undefined} onClick={() => { setPhaseIndex(index); setCopied(false) }}><b>{String(index + 1).padStart(2, '0')}</b><span>{item.title}</span></button>)}</div><article className="workflow-phase"><header><div><p className="eyebrow">Etapa {phaseIndex + 1} de {scenario.phases.length}</p><h2>{phase.title}</h2><p>{phase.purpose}</p></div><span className="workflow-phase-index">0{phaseIndex + 1}</span></header><div className="workflow-phase-grid"><div><h3>Peça ao agente</h3><p className="workflow-prompt">“{phase.prompt}”</p><button type="button" className="copy-button" onClick={copyPrompt}>{copied ? 'Copiado!' : 'Copiar pedido'}</button></div><div><h3>O que conferir</h3><ul>{phase.evidence.map(item => <li key={item}>{item}</li>)}</ul></div></div><div className="workflow-warning"><strong>Sinal de atenção</strong><p>{phase.warning}</p></div></article></div>
    <p className="workflow-source">O ciclo de revisar, corrigir e validar com evidências segue a <a href="https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex" target="_blank" rel="noreferrer">OpenAI Docs</a>. Os casos acima são exemplos didáticos.</p>
  </section>
}

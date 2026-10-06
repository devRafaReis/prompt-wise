import { useState } from 'react'
import { evaluationCase, evaluationResponses } from '../data/evaluationLab'
import { Icon } from './GuideUI'

export default function EvaluationLab() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const selected = evaluationResponses.find(response => response.id === selectedId)

  function selectResponse(id: string) {
    setSelectedId(id)
    setRevealed(false)
  }

  return <section className="evaluation-lab" aria-labelledby="evaluation-lab-title">
    <header><div><p className="eyebrow">Laboratório de avaliação</p><h2 id="evaluation-lab-title">Compare respostas usando critérios</h2></div><span>Exemplo local · sem chamada de modelo</span></header>
    <div className="evaluation-case"><div><small>PEDIDO</small><p>{evaluationCase.request}</p></div><div><small>CONTEXTO DISPONÍVEL</small><p>{evaluationCase.context}</p></div></div>
    <fieldset className="evaluation-options"><legend>Qual resposta atende melhor aos critérios?</legend>{evaluationResponses.map(response => <button key={response.id} type="button" aria-pressed={selectedId === response.id} className={selectedId === response.id ? 'selected' : ''} onClick={() => selectResponse(response.id)}><span>{response.title}</span><p>{response.text}</p></button>)}</fieldset>
    <button type="button" className="evaluation-reveal" disabled={!selectedId} onClick={() => setRevealed(true)}>Aplicar critérios</button>
    {revealed && selected && <div className={`evaluation-result ${selected.id === 'b' ? 'correct' : 'needs-review'}`} role="status"><div><Icon name={selected.id === 'b' ? 'check' : 'warning'} size={18} /><strong>{selected.id === 'b' ? 'Escolha consistente com os critérios' : 'Revise a escolha'}</strong></div><p>{selected.explanation}</p><ul>{evaluationCase.criteria.map(criterion => { const passed = selected.results[criterion.id]; return <li key={criterion.id}><Icon name={passed ? 'check' : 'warning'} size={15} /><span>{criterion.label}</span><b>{passed ? 'Atende' : 'Não atende'}</b></li> })}</ul></div>}
    <p className="evaluation-disclaimer">Os critérios produzem uma análise didática de aprovação/revisão; não são métricas reais nem substituem avaliação humana do produto.</p>
  </section>
}

import { useState } from 'react'
import { Icon } from '../components/GuideUI'
import SectionHeading from '../components/SectionHeading'
import { approvalPrinciples, humanReviewScenarios, reviewDecisions, type ReviewDecision } from '../data/humanReview'

export default function HumanReviewSection() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [decision, setDecision] = useState<ReviewDecision | null>(null)
  const scenario = humanReviewScenarios[scenarioIndex]

  function changeScenario(index: number) {
    setScenarioIndex(index)
    setDecision(null)
  }

  return <section className="human-review-section">
    <SectionHeading id="aprovacao" />
    <div className="human-review-intro"><Icon name="shield" size={23} /><p><strong>Aprovação não é um clique genérico.</strong> Ela precisa mostrar a ação, os dados envolvidos, o destino e o efeito esperado para permitir uma decisão consciente.</p></div>
    <div className="review-scenario-tabs" role="tablist" aria-label="Cenários de aprovação">{humanReviewScenarios.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === scenarioIndex} className={index === scenarioIndex ? 'selected' : ''} onClick={() => changeScenario(index)}><span>{item.risk}</span><strong>{item.title}</strong></button>)}</div>
    <article className="review-decision-card"><header><div><p className="eyebrow">Decisão humana</p><h2>{scenario.title}</h2></div><span className={`risk-${scenario.risk.toLocaleLowerCase('pt-BR')}`}>Risco {scenario.risk}</span></header><div className="review-action"><small>AÇÃO PROPOSTA</small><p>{scenario.action}</p></div><div className="review-decision-options" role="group" aria-label="Escolha o controle adequado">{reviewDecisions.map(option => <button key={option.id} type="button" aria-pressed={decision === option.id} onClick={() => setDecision(option.id)}>{option.label}</button>)}</div>{decision && <div className={`review-decision-feedback ${decision === scenario.recommended ? 'correct' : 'incorrect'}`} role="status"><Icon name={decision === scenario.recommended ? 'check' : 'warning'} size={18} /><div><strong>{decision === scenario.recommended ? 'Controle adequado para o cenário' : 'Esse controle não é suficiente ou é excessivo'}</strong><p>{scenario.explanation}</p></div></div>}</article>
    <div className="approval-principles"><h2>Como desenhar a aprovação</h2>{approvalPrinciples.map(item => <p key={item}><Icon name="check" size={16} />{item}</p>)}</div>
    <p className="source-note">Referência: <a href="https://developers.openai.com/api/docs/guides/agents/guardrails-approvals" target="_blank" rel="noreferrer">OpenAI Docs — guardrails e revisão humana</a>.</p>
  </section>
}

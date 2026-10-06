import { useState } from 'react'
import { decisionApproaches, decisionScenarios } from '../data/aiLandscape'
import { Icon } from './GuideUI'

export default function ApproachDecisionDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [choice, setChoice] = useState<string | null>(null)
  const scenario = decisionScenarios[scenarioIndex]
  const recommended = decisionApproaches.find(approach => approach.id === scenario.recommended)

  function changeScenario(index: number) {
    setScenarioIndex(index)
    setChoice(null)
  }

  return <section className="decision-demo" aria-labelledby="decision-demo-title">
    <header><div><p className="eyebrow">Simulador de escolha</p><h2 id="decision-demo-title">Qual abordagem combina com o problema?</h2></div><span>Cenário {scenarioIndex + 1} de {decisionScenarios.length}</span></header>
    <div className="decision-scenarios" role="tablist" aria-label="Cenários de arquitetura">{decisionScenarios.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === scenarioIndex} className={index === scenarioIndex ? 'selected' : ''} onClick={() => changeScenario(index)}>{item.title}</button>)}</div>
    <div className="decision-question"><small>SITUAÇÃO</small><p>{scenario.situation}</p></div>
    <div className="decision-options" role="group" aria-label="Escolha uma abordagem">{decisionApproaches.map(approach => <button key={approach.id} type="button" aria-pressed={choice === approach.id} onClick={() => setChoice(approach.id)}>{approach.label}</button>)}</div>
    {choice && <div className={`decision-feedback ${choice === scenario.recommended ? 'correct' : 'alternative'}`} role="status"><Icon name={choice === scenario.recommended ? 'check' : 'warning'} size={18} /><div><strong>{choice === scenario.recommended ? 'Boa escolha para a necessidade principal' : `A opção mais direta aqui é ${recommended?.label}`}</strong><p>{scenario.reason} Outras abordagens ainda podem participar como apoio.</p></div></div>}
  </section>
}

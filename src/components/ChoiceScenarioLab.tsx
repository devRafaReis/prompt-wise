import { useState } from 'react'
import { Icon } from './GuideUI'

export type ChoiceScenario = {
  id: string
  title: string
  situation: string
  question: string
  options: readonly { id: string; label: string; text: string }[]
  correct: string
  explanation: string
}

type ChoiceScenarioLabProps = {
  id: string
  eyebrow: string
  title: string
  scenarios: readonly ChoiceScenario[]
  disclaimer: string
  className?: string
}

export default function ChoiceScenarioLab({ id, eyebrow, title, scenarios, disclaimer, className = '' }: ChoiceScenarioLabProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [choice, setChoice] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const scenario = scenarios[scenarioIndex]
  const correct = choice === scenario.correct

  function changeScenario(index: number) {
    setScenarioIndex(index)
    setChoice(null)
    setRevealed(false)
  }

  function selectOption(optionId: string) {
    setChoice(optionId)
    setRevealed(false)
  }

  return <section className={`evaluation-lab choice-lab ${className}`.trim()} aria-labelledby={`${id}-title`}>
    <header><div><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2></div><span>Cenário {scenarioIndex + 1} de {scenarios.length}</span></header>
    <div className="technique-tabs choice-lab-tabs" role="tablist" aria-label={`Cenários de ${title}`}>{scenarios.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === scenarioIndex} className={index === scenarioIndex ? 'selected' : ''} onClick={() => changeScenario(index)}>{item.title}</button>)}</div>
    <div className="evaluation-case choice-lab-case"><div><small>SITUAÇÃO</small><p>{scenario.situation}</p></div><div><small>PERGUNTA</small><p>{scenario.question}</p></div></div>
    <fieldset className="evaluation-options choice-lab-options"><legend>Escolha uma alternativa</legend>{scenario.options.map(option => <button key={option.id} type="button" aria-pressed={choice === option.id} className={choice === option.id ? 'selected' : ''} onClick={() => selectOption(option.id)}><span>{option.label}</span><p>{option.text}</p></button>)}</fieldset>
    <button type="button" className="evaluation-reveal choice-lab-reveal" disabled={!choice} onClick={() => setRevealed(true)}>Verificar escolha</button>
    {revealed && <div className={`evaluation-result ${correct ? 'correct' : 'needs-review'}`} role="status"><div><Icon name={correct ? 'check' : 'warning'} size={18} /><strong>{correct ? 'Boa decisão' : 'Essa escolha deixa uma lacuna'}</strong></div><p>{scenario.explanation}</p></div>}
    <p className="evaluation-disclaimer">{disclaimer}</p>
  </section>
}

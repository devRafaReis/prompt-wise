import { useState } from 'react'
import { Icon } from '../components/GuideUI'
import PlainLanguage from '../components/PlainLanguage'
import SectionHeading from '../components/SectionHeading'
import { techniques, techniqueScenarios, type TechniqueId } from '../data/techniqueChoice'
import { plainLanguage } from '../data/plainLanguage'

export default function TechniqueChoiceSection() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [choice, setChoice] = useState<TechniqueId | null>(null)
  const scenario = techniqueScenarios[scenarioIndex]
  const recommended = techniques.find(technique => technique.id === scenario.recommended)

  function changeScenario(index: number) {
    setScenarioIndex(index)
    setChoice(null)
  }

  return <section className="technique-section">
    <SectionHeading id="tecnicas" />
    <div className="technique-principle"><Icon name="layers" size={23} /><p><strong>Diagnostique antes de escolher.</strong> Prompt melhora instruções; RAG fornece contexto; ajuste especializado busca consistência aprendida. Eles podem ser combinados, mas cada camada adiciona operação e pontos de falha.</p></div>
    <PlainLanguage data={plainLanguage.tecnicas!} />
    <div className="technique-grid">{techniques.map(technique => <article key={technique.id}><header><span>{technique.focus}</span><h2>{technique.title}</h2></header><div><small>USE QUANDO</small><p>{technique.useWhen}</p></div><footer><small>TRADE-OFF</small><p>{technique.tradeoff}</p></footer></article>)}</div>
    <section className="technique-lab" aria-labelledby="technique-lab-title"><header><div><p className="eyebrow">Exercício de diagnóstico</p><h2 id="technique-lab-title">Qual alavanca testar primeiro?</h2></div><span>Cenário {scenarioIndex + 1} de {techniqueScenarios.length}</span></header><div className="technique-tabs" role="tablist" aria-label="Cenários de otimização">{techniqueScenarios.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === scenarioIndex} className={index === scenarioIndex ? 'selected' : ''} onClick={() => changeScenario(index)}>{item.title}</button>)}</div><div className="technique-problem"><small>PROBLEMA OBSERVADO</small><p>{scenario.problem}</p></div><div className="technique-options" role="group" aria-label="Escolha uma técnica">{techniques.map(technique => <button key={technique.id} type="button" aria-pressed={choice === technique.id} onClick={() => setChoice(technique.id)}>{technique.title}</button>)}</div>{choice && <div className={`technique-feedback ${choice === scenario.recommended ? 'correct' : 'review'}`} role="status"><Icon name={choice === scenario.recommended ? 'check' : 'warning'} size={18} /><div><strong>{choice === scenario.recommended ? 'Boa primeira hipótese' : `Comece por ${recommended?.title}`}</strong><p>{scenario.reason} Confirme a decisão com avaliações.</p></div></div>}</section>
    <p className="source-note">Referência conceitual: <a href="https://developers.openai.com/api/docs/guides/optimizing-llm-accuracy" target="_blank" rel="noreferrer">OpenAI Docs — prompt, RAG e ajuste</a>. A disponibilidade de técnicas de ajuste depende da plataforma e deve ser verificada antes da implementação.</p>
  </section>
}

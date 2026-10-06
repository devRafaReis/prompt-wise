import { useState } from 'react'
import { Icon } from '../components/GuideUI'
import PlainLanguage from '../components/PlainLanguage'
import SectionHeading from '../components/SectionHeading'
import { architectureRules, architectureScenarios } from '../data/architecture'
import { plainLanguage } from '../data/plainLanguage'

export default function ArchitectureSection() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const scenario = architectureScenarios[scenarioIndex]

  return <section className="architecture-section">
    <SectionHeading id="arquitetura" />
    <div className="architecture-boundary"><Icon name="shield" size={23} /><p><strong>Fronteira principal:</strong> o navegador apresenta a experiência; o servidor protege credenciais, aplica permissões e coordena chamadas externas.</p></div>
    <PlainLanguage data={plainLanguage.arquitetura!} />
    <div className="architecture-tabs" role="tablist" aria-label="Escolha um tipo de aplicação">{architectureScenarios.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === scenarioIndex} className={index === scenarioIndex ? 'selected' : ''} onClick={() => setScenarioIndex(index)}><span>0{index + 1}</span><strong>{item.label}</strong></button>)}</div>
    <article className="architecture-board" aria-live="polite"><header><p className="eyebrow">Fluxo conceitual</p><h2>{scenario.label}</h2><p>{scenario.description}</p></header><ol>{scenario.steps.map((step, index) => <li key={`${scenario.id}-${step.title}`}><div><b>{String(index + 1).padStart(2, '0')}</b><small>{step.layer}</small></div><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><p className="architecture-disclaimer">Diagrama didático: não representa tráfego, latência ou infraestrutura executada por esta página.</p></article>
    <div className="architecture-rules"><h2>Controles que atravessam todas as camadas</h2><div>{architectureRules.map(rule => <p key={rule}><Icon name="check" size={16} />{rule}</p>)}</div></div>
    <p className="source-note">Referência: <a href="https://developers.openai.com/api/docs/guides/agents-api/architecture" target="_blank" rel="noreferrer">OpenAI Docs — arquitetura de agentes</a>.</p>
  </section>
}

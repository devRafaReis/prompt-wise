import { useState } from 'react'
import { Icon } from '../components/GuideUI'
import SectionHeading from '../components/SectionHeading'
import { failureModes, recoveryLoop } from '../data/failureModes'

export default function FailureModesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const failure = failureModes[selectedIndex]

  return <section className="failure-section">
    <SectionHeading id="falhas" />
    <ol className="recovery-loop" aria-label="Ciclo de recuperação">{recoveryLoop.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, '0')}</b><span>{step}</span></li>)}</ol>
    <div className="failure-layout"><div className="failure-selector" role="tablist" aria-label="Modos de falha">{failureModes.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={index === selectedIndex} className={index === selectedIndex ? 'selected' : ''} onClick={() => setSelectedIndex(index)}><span>{item.layer}</span><strong>{item.title}</strong></button>)}</div><article className="failure-panel" aria-live="polite"><header><div><p className="eyebrow">Falha {selectedIndex + 1} de {failureModes.length}</p><h2>{failure.title}</h2></div><Icon name="warning" size={23} /></header><div className="failure-detail"><small>SINAL OBSERVADO</small><p>{failure.symptom}</p></div><div className="failure-detail"><small>ONDE INVESTIGAR</small><p>{failure.inspect}</p></div><div className="failure-response"><Icon name="check" size={17} /><div><small>RESPOSTA SEGURA</small><p>{failure.response}</p></div></div></article></div>
    <p className="failure-disclaimer">Cenários didáticos: a causa real deve ser confirmada com logs, versões, resultados de ferramentas e casos reproduzíveis.</p>
  </section>
}

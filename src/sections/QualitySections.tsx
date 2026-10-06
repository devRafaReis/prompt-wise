import { Detail, Icon, PromptBox } from '../components/GuideUI'
import { TrustBoundaryDemo } from '../components/AgentLoopDemo'
import SectionHeading from '../components/SectionHeading'
import { closingPrinciples, reviewChecklist, reviewSteps, safetyAlerts } from '../data/content'
import { reviewPrompt, safetyPrompt } from '../data/training'

export function ReviewSection() {
  return <section>
    <SectionHeading id="revisao" />
    <ol className="review-flow">{reviewSteps.map((item, i) => <li key={item}><b>0{i + 1}</b><span>{item}</span></li>)}</ol>
    <div className="checklist"><h2>O que procurar no diff</h2>{reviewChecklist.map(item => <span key={item}><Icon name="check" size={16} />{item}</span>)}</div>
    <Detail title="Abrir prompt de revisão"><PromptBox onCopy={reviewPrompt}>{reviewPrompt}</PromptBox></Detail>
  </section>
}

export function SafetySection() {
  return <section>
    <SectionHeading id="seguranca" />
    <div className="alerts">{safetyAlerts.map((item, i) => <div key={item}><span><Icon name={i === 0 ? 'shield' : 'warning'} /></span><p>{item}</p></div>)}</div>
    <Detail title="Laboratório: reconhecer prompt injection" open><TrustBoundaryDemo /></Detail>
    <Detail title="Abrir prompt de segurança"><PromptBox onCopy={safetyPrompt}>{safetyPrompt}</PromptBox></Detail>
  </section>
}

export function ClosingSection() {
  return <section className="closing">
    <SectionHeading id="fechamento" />
    <div className="principles">{closingPrinciples.map((item, i) => <div key={item}><b>0{i + 1}</b><p>{item}</p></div>)}</div>
    <div className="final-message"><Icon name="spark" size={28} /><p>“Você fornece contexto, define limites e mantém a responsabilidade pela decisão.”</p></div>
  </section>
}

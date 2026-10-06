import { Icon, Insight, Detail, PromptBox } from '../components/GuideUI'
import SectionHeading from '../components/SectionHeading'
import { craftSteps, openingInsights } from '../data/content'
import { loginPrompt } from '../data/training'

export function WelcomeSection() {
  return <section className="welcome">
    <div className="welcome-orbit" aria-hidden="true"><Icon name="spark" size={42} /></div>
    <p className="eyebrow">Guia interno para desenvolvimento</p>
    <h1>IA na programação:<br /><em>qualidade e segurança</em></h1>
    <p className="lead">Uma conversa prática sobre como usar agentes de IA sem abrir mão do pensamento técnico.</p>
  </section>
}

export function OpeningSection() {
  return <section>
    <SectionHeading id="abertura" />
    <div className="quote-card"><Icon name="spark" size={28} /><blockquote>“Não confie em código apenas porque ele parece convincente.”</blockquote></div>
    <div className="three-grid">{openingInsights.map(item => <Insight key={item.title} {...item} />)}</div>
  </section>
}

export function PromptsSection() {
  return <section>
    <SectionHeading id="prompts" />
    <div className="craft"><div className="craft-title"><span>CRAFT</span><p>Uma estrutura simples para pedidos com intenção.</p></div><div className="craft-list">{craftSteps.map(({ letter, title, description }) => <div key={letter}><b>{letter}</b><strong>{title}</strong><span>{description}</span></div>)}</div></div>
    <div className="compare"><div className="bad"><small>Prompt vago</small><p>“Faça uma tela de login em React.”</p></div><div className="good"><small>Prompt com CRAFT</small><p>Contexto, critérios de validação, acessibilidade, estados e restrições explícitos.</p><Detail title="Ver prompt completo"><PromptBox onCopy={loginPrompt}>{loginPrompt}</PromptBox></Detail></div></div>
  </section>
}

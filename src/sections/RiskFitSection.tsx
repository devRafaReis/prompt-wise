import ChoiceScenarioLab from '../components/ChoiceScenarioLab'
import { Icon } from '../components/GuideUI'
import PlainLanguage from '../components/PlainLanguage'
import SectionHeading from '../components/SectionHeading'
import { riskChoiceScenarios, solutionLadder, threatModel } from '../data/advancedPractice'
import { plainLanguage } from '../data/plainLanguage'

export default function RiskFitSection() {
  return <section className="risk-fit-section">
    <SectionHeading id="adequacao" />
    <div className="risk-fit-principle"><Icon name="layers" size={22} /><p><strong>Comece pela solução menos complexa que produz evidência suficiente.</strong> IA só entra quando interpretação, geração, recuperação semântica ou decisão em etapas resolvem uma necessidade real.</p></div>
    <PlainLanguage data={plainLanguage.adequacao!} />

    <article className="solution-ladder"><header><p className="eyebrow">Antes de escolher uma IA</p><h2>Escada de complexidade</h2></header><ol>{solutionLadder.map((item, index) => <li key={item.title}><b>{String(index + 1).padStart(2, '0')}</b><div><h3>{item.title}</h3><p>{item.signal}</p><small>{item.example}</small></div></li>)}</ol></article>

    <article className="threat-model-board"><header><div><p className="eyebrow">Threat modeling aplicado</p><h2>Entrada, impacto e controle</h2></div><Icon name="shield" size={22} /></header><div className="table-wrap" tabIndex={0} aria-label="Ameaças e controles para aplicações com IA"><table><thead><tr><th>Ameaça</th><th>Como entra</th><th>Impacto</th><th>Controle</th></tr></thead><tbody>{threatModel.map(row => <tr key={row.threat}><td data-label="Ameaça"><strong>{row.threat}</strong></td><td data-label="Como entra">{row.entry}</td><td data-label="Impacto">{row.impact}</td><td data-label="Controle">{row.control}</td></tr>)}</tbody></table></div></article>

    <div className="risk-fit-summary"><article><Icon name="check" size={18} /><div><h2>Sinal para usar IA</h2><p>Existe variabilidade que regras simples não resolvem e há como avaliar a saída, limitar o impacto e recuperar falhas.</p></div></article><article><Icon name="warning" size={18} /><div><h2>Sinal para não usar</h2><p>O resultado precisa ser exato e determinístico, o dado já está estruturado ou o risco não pode ser controlado.</p></div></article></div>

    <ChoiceScenarioLab id="risk-fit-quiz" eyebrow="Verificação por escolhas" title="IA, regra ou bloqueio?" scenarios={riskChoiceScenarios} disclaimer="As alternativas representam decisões didáticas. Sistemas reais exigem validação da arquitetura, das permissões e do impacto." className="risk-fit-quiz" />
  </section>
}

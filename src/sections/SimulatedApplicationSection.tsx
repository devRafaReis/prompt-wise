import { Detail, Icon } from '../components/GuideUI'
import PlainLanguage from '../components/PlainLanguage'
import SectionHeading from '../components/SectionHeading'
import { integrationControls, memoryKinds, simulatedApplicationFlow, simulatedEvents, simulatedHandlerCode } from '../data/advancedPractice'
import { plainLanguage } from '../data/plainLanguage'

export default function SimulatedApplicationSection() {
  return <section className="simulated-app-section">
    <SectionHeading id="aplicacao" />
    <div className="simulation-notice"><Icon name="shield" size={22} /><p><strong>Ambiente inteiramente didático.</strong> O fluxo, os eventos e o código desta página são exemplos locais. Não há chave, provedor configurado, requisição de rede ou chamada real de API.</p></div>
    <PlainLanguage data={plainLanguage.aplicacao!} />

    <ol className="simulated-app-flow" aria-label="Fluxo de uma aplicação com IA">{simulatedApplicationFlow.map((step, index) => <li key={step.title}><div><b>{String(index + 1).padStart(2, '0')}</b><small>{step.layer}</small></div><h2>{step.title}</h2><p>{step.text}</p></li>)}</ol>

    <article className="simulated-request-board">
      <header><div><p className="eyebrow">Exemplo prático local</p><h2>Do pedido ao resultado estruturado</h2></div><span>Sem rede · sem credencial</span></header>
      <div className="simulated-request-grid"><div><h3>Handler ilustrativo</h3><pre>{simulatedHandlerCode}</pre></div><div><h3>Eventos que a interface receberia</h3><ol>{simulatedEvents.map((item, index) => <li key={item.event}><b>{String(index + 1).padStart(2, '0')}</b><div><strong>{item.event}</strong><code>{item.payload}</code></div></li>)}</ol><p>Esses eventos são dados fixos do frontend. Eles explicam streaming e progresso sem abrir conexão externa.</p></div></div>
    </article>

    <article className="integration-controls">
      <header><p className="eyebrow">Contrato de produção, exemplo local</p><h2>O que a implementação precisa decidir</h2></header>
      <div className="table-wrap" tabIndex={0} aria-label="Controles de uma integração com IA"><table><thead><tr><th>Preocupação</th><th>Decisão no backend</th><th>Efeito visível</th></tr></thead><tbody>{integrationControls.map(row => <tr key={row.concern}><td data-label="Preocupação"><strong>{row.concern}</strong></td><td data-label="Decisão no backend">{row.implementation}</td><td data-label="Efeito visível">{row.visibleEffect}</td></tr>)}</tbody></table></div>
    </article>

    <article className="memory-map">
      <header><p className="eyebrow">Estado não é memória infinita</p><h2>Quatro lugares diferentes para a informação</h2><p>Guardar tudo aumenta risco e não torna o sistema mais inteligente. Cada informação precisa de finalidade, origem e prazo.</p></header>
      <div>{memoryKinds.map(item => <article key={item.title}><h3>{item.title}</h3><span>{item.lifetime}</span><p><strong>Use para:</strong> {item.use}</p><p><strong>Evite:</strong> {item.avoid}</p></article>)}</div>
    </article>

    <Detail title="Limites deste exemplo"><ul className="practice-list"><li>Não mede tokens, latência, custo ou qualidade de um modelo real.</li><li>Não demonstra autenticação, banco, fila ou provedor em execução.</li><li>Não deve ser copiado como implementação pronta; ele torna responsabilidades e contratos visíveis.</li><li>Uma integração real deve permanecer no servidor e seguir as regras, testes e controles do produto.</li></ul></Detail>
  </section>
}

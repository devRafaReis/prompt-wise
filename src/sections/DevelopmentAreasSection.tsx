import { Detail, Icon, PromptBox } from '../components/GuideUI'
import DevelopmentAreasQuiz from '../components/DevelopmentAreasQuiz'
import SectionHeading from '../components/SectionHeading'
import { crossLayerChecks, databaseExamples, developmentAreas, developmentScenario } from '../data/developmentAreas'

export default function DevelopmentAreasSection() {
  return <section className="development-areas-section">
    <SectionHeading id="frentes" />

    <article className="development-scenario">
      <header><Icon name="layers" size={22} /><div><p className="eyebrow">Uma funcionalidade, várias responsabilidades</p><h2>{developmentScenario.title}</h2></div></header>
      <p>{developmentScenario.description}</p>
      <ul>{developmentScenario.acceptance.map(item => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul>
    </article>

    <div className="development-area-grid">
      {developmentAreas.map((area, index) => <article className={`development-area-card area-${area.id}`} key={area.id}>
        <header><b>{String(index + 1).padStart(2, '0')}</b><div><h2>{area.title}</h2><p>{area.subtitle}</p></div></header>
        <div><h3>Onde a IA ajuda</h3><ul>{area.usefulFor.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div className="development-context"><h3>Contexto mínimo</h3><ul>{area.context.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div><h3>Evidência para aprovar</h3><ul>{area.evidence.map(item => <li key={item}>{item}</li>)}</ul></div>
        <p className="development-risk"><Icon name="warning" size={16} /><span><strong>Risco:</strong> {area.risk}</span></p>
        <Detail title={`Ver exemplo de pedido — ${area.title}`}><PromptBox onCopy={area.prompt}>{area.prompt}</PromptBox></Detail>
      </article>)}
    </div>

    <article className="database-practice">
      <header><div><p className="eyebrow">Banco de dados em foco</p><h2>Tabela e procedure: rascunho não é mudança pronta</h2></div><Icon name="code" size={22} /></header>
      <p className="database-practice-lead">Os exemplos abaixo tornam a discussão concreta, mas são ilustrativos. Sintaxe, locks, permissões, volume e estratégia de implantação precisam ser validados no ambiente real.</p>
      <div className="database-code-grid">
        <div><h3>1. Evolução da tabela</h3><pre>{databaseExamples.migration}</pre></div>
        <div><h3>2. Procedure de atualização</h3><pre>{databaseExamples.procedure}</pre></div>
      </div>
      <div className="database-guardrail"><Icon name="shield" size={18} /><p><strong>Antes de executar:</strong> use dados representativos fora de produção, revise plano e locks, ensaie migração e reversão, limite privilégios e confirme backup e monitoração.</p></div>
    </article>

    <article className="cross-layer-checks">
      <header><p className="eyebrow">Raciocínio por camada</p><h2>Quatro perguntas que atravessam todas as frentes</h2></header>
      <div className="table-wrap" tabIndex={0} aria-label="Perguntas para aplicar IA nas frentes de desenvolvimento">
        <table>
          <thead><tr><th>Momento</th><th>Pergunta</th><th>Aplicação no exemplo</th></tr></thead>
          <tbody>{crossLayerChecks.map(row => <tr key={row.moment}><td data-label="Momento"><strong>{row.moment}</strong></td><td data-label="Pergunta">{row.question}</td><td data-label="Aplicação no exemplo">{row.example}</td></tr>)}</tbody>
        </table>
      </div>
    </article>

    <DevelopmentAreasQuiz />
  </section>
}

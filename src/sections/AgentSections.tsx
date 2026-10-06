import { CopyButton, Detail, Icon, Model } from '../components/GuideUI'
import { AgentLoopDemo } from '../components/AgentLoopDemo'
import SectionHeading from '../components/SectionHeading'
import { models } from '../data/content'
import { frontendRulesExample, frontendRulesUrl } from '../data/training'

export function ModelsSection() {
  return <section>
    <SectionHeading id="modelos" />
    <div className="model-grid model-grid-four">{models.map(({ title, badge, items }) => <Model key={title} title={title} badge={badge} items={[...items]} />)}</div>
    <div className="model-note"><Icon name="spark" /><p><strong>Versões importam:</strong> Luna, Sol e Astra são a linha atual; Terra representa uma opção de geração anterior quando o ambiente ainda a disponibiliza. Verifique sempre os modelos habilitados no seu workspace antes de padronizar um fluxo.</p></div>
    <div className="agent-scenarios">{models.map(model => <div key={model.title}><span>{model.title}</span><p>“{model.example}”</p></div>)}</div>
    <div className="agent-lesson-intro"><strong>Modelo ≠ agente</strong><span>O modelo gera decisões e respostas. Um agente combina modelo, instruções e ferramentas em etapas que podem ser verificadas.</span></div>
    <Detail title="Simular como um agente usa ferramentas"><AgentLoopDemo /></Detail>
    <Detail title="Ver diferenças entre versões e esforço"><div className="table-wrap"><table><thead><tr><th>Opção</th><th>Melhor para</th><th>Trade-off</th><th>Como ajustar</th></tr></thead><tbody>{models.map(model => <tr key={model.title}><td data-label="Opção"><b>{model.title} · {model.badge.split(' · ')[0]}</b></td><td data-label="Melhor para">{model.bestFor}</td><td data-label="Trade-off">{model.tradeoff}</td><td data-label="Como ajustar">{model.adjustment}</td></tr>)}</tbody></table></div></Detail>
  </section>
}

export function RulesSection() {
  return <section>
    <SectionHeading id="regras" />
    <p className="lead"><code>AGENTS.md</code> é carregado automaticamente pelo Codex no escopo aplicável. Outros arquivos Markdown, como <code>CONTRIBUTING.md</code>, precisam ser referenciados ou configurados como alternativa.</p>
    <div className="rules-layout"><article className="rule-file"><div className="card-kicker"><Icon name="code" size={17} /> EXEMPLO · FRONTEND/AGENTS.MD</div><pre>{`## Organização\nsrc/pages/                       → composição de páginas\nsrc/features/pedidos/api/        → endpoints da feature\nsrc/features/pedidos/components/ → interface do domínio\nsrc/shared/ui/                   → design system\n\n## UI e UX\nReutilize tokens; contemple foco, erro e vazio.\n\n## API\nConfira o contrato; não invente rotas ou campos.`}</pre></article><div className="rule-explainer"><h2>O que uma regra útil define</h2><p>Onde criar arquivos, quais componentes e tokens reutilizar, como acessar endpoints e como verificar o resultado. Regras de pastas específicas complementam as da raiz.</p><div><Icon name="check" size={16} /><span>UI/UX: semântica, responsividade, estados e acessibilidade.</span></div><div><Icon name="check" size={16} /><span>API: contrato, cliente HTTP, erros e cancelamento.</span></div><div><Icon name="check" size={16} /><span>Arquitetura: página, feature, componente compartilhado.</span></div></div></div>
    <Detail title="Ver arquivo completo de regras para frontend"><div className="rules-example-actions"><CopyButton value={frontendRulesExample} label="Copiar regras" /><a className="download-link" href={frontendRulesUrl} download="AGENTS.md">Baixar AGENTS.md</a></div><pre className="rules-example-code">{frontendRulesExample}</pre></Detail>
    <div className="rule-impact-grid"><div className="impact-good"><h2>Quando ajudam</h2><ul><li>Preservam padrões de arquitetura e nomenclatura.</li><li>Reduzem retrabalho e perguntas repetidas.</li><li>Tornam validações e limites explícitos.</li></ul></div><div className="impact-risk"><h2>Quando atrapalham</h2><ul><li>Regras longas ou contraditórias confundem o agente.</li><li>Documentação desatualizada gera decisões erradas.</li><li>Obrigar leitura irrelevante consome contexto e tempo.</li></ul></div></div>
    <div className="model-note"><Icon name="warning" /><p><strong>Regra prática:</strong> adapte o exemplo ao projeto real. Prefira “consulte arquitetura.md ao mudar domínios” a “leia todos os documentos antes de editar”. Revise as regras quando o projeto evoluir.</p></div>
  </section>
}

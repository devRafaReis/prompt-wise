import { Detail, Icon } from '../components/GuideUI'
import ApproachDecisionDemo from '../components/ApproachDecisionDemo'
import PlainLanguage from '../components/PlainLanguage'
import SectionHeading from '../components/SectionHeading'
import { agentRagComparison, aiApproaches, combinedExample } from '../data/aiLandscape'
import { plainLanguage } from '../data/plainLanguage'

export default function AiLandscapeSection() {
  return <section className="ai-landscape-section">
    <SectionHeading id="mapa" />

    <div className="landscape-key"><Icon name="layers" size={22} /><p><strong>Este mapa compara formas de aplicar IA, não versões de modelo.</strong> Elas não são exclusivas: um agente pode usar RAG, um workflow pode chamar um modelo multimodal e uma aplicação pode combinar geração com previsão.</p></div>
    <PlainLanguage data={plainLanguage.mapa!} />

    <div className="approach-grid">{aiApproaches.map(approach => <article key={approach.id} className={`approach-card approach-${approach.id}`}><header><span>{approach.kind}</span><h2>{approach.title}</h2></header><strong>{approach.question}</strong><p>{approach.description}</p><div className="approach-usage"><h3>Como usar na prática</h3><dl><div><dt>Onde aparece</dt><dd>{approach.usage.where}</dd></div><div><dt>Precisa de</dt><dd>{approach.usage.needs}</dd></div><div><dt>Fluxo de uso</dt><dd>{approach.usage.flow}</dd></div></dl></div><footer><small>Exemplo</small><p>{approach.example}</p></footer></article>)}</div>

    <div className="landscape-clarification"><Icon name="shield" size={20} /><p><strong>RAG não é um servidor “treinado com as informações”.</strong> Normalmente, os documentos são preparados e indexados; um serviço de recuperação seleciona trechos e o backend os envia ao modelo como contexto. O modelo pode continuar o mesmo, sem novo treinamento.</p></div>

    <div className="agent-rag-heading"><div><p className="eyebrow">Comparação direta</p><h2>Agente executa um ciclo. RAG fornece evidência.</h2></div><p>O agente usado no desenvolvimento pode consultar um RAG, mas também pode trabalhar com arquivos, ferramentas, comandos e aprovações.</p></div>
    <div className="table-wrap"><table className="agent-rag-table"><thead><tr><th>Aspecto</th><th>Agente do dia a dia</th><th>RAG</th></tr></thead><tbody>{agentRagComparison.map(row => <tr key={row.aspect}><td data-label="Aspecto"><b>{row.aspect}</b></td><td data-label="Agente do dia a dia">{row.agent}</td><td data-label="RAG">{row.rag}</td></tr>)}</tbody></table></div>

    <article className="combined-example"><header><p className="eyebrow">Exemplo combinado</p><h2>Quando o agente usa RAG como ferramenta</h2></header><ol>{combinedExample.map((step, index) => <li key={`${step.actor}-${index}`}><b>{String(index + 1).padStart(2, '0')}</b><div><strong>{step.actor}</strong><p>{step.text}</p></div></li>)}</ol></article>

    <Detail title="Como escolher a abordagem"><ul className="practice-list"><li>Precisa apenas criar ou transformar conteúdo? Comece com um modelo generativo e contexto bem definido.</li><li>Precisa responder com dados privados, atuais ou citáveis? Acrescente recuperação, formando um fluxo RAG.</li><li>Precisa decidir etapas ou usar ferramentas para concluir uma tarefa? Projete um agente com limites e aprovações.</li><li>O caminho é estável e deve ser previsível? Prefira um workflow explícito e use IA apenas nas etapas necessárias.</li><li>Precisa classificar ou prever um valor? Considere IA preditiva e compare-a com regras e métodos estatísticos mais simples.</li></ul><p className="source-note">Referência: <a href="https://developers.openai.com/api/docs/guides/tools" target="_blank" rel="noreferrer">OpenAI Docs — ferramentas e agentes</a>.</p></Detail>
    <ApproachDecisionDemo />
  </section>
}

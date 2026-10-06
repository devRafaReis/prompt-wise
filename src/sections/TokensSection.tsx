import { CopyButton, Detail, Icon, TokenStep } from '../components/GuideUI'
import SectionHeading from '../components/SectionHeading'
import TokenPlayground from '../components/TokenPlayground'
import { serverUsageExample } from '../data/tokenDemo'

export default function TokensSection() {
  return <section className="token-section">
    <SectionHeading id="tokens" />
    <div className="token-more"><Detail title="Entender tokens e contexto" open><div className="generation-grid">
      <article className="generation-card"><div className="card-kicker"><Icon name="layers" size={17} /> 01 · Tokenização</div><h2>Como o modelo lê</h2><p>O texto é dividido em tokens, que podem representar palavras, partes de palavras ou sinais. A divisão exata depende do modelo.</p><div className="token-example"><span>const</span><span> soma</span><span> =</span><span> (</span><span>a</span><span>, b</span><span>)</span></div><small>Fragmentação ilustrativa; não é um tokenizer real.</small></article>
      <article className="generation-card generation-accent"><div className="card-kicker"><Icon name="spark" size={17} /> 02 · Geração</div><h2>Como a resposta é criada</h2><p>Com base no contexto, o modelo escolhe um próximo token e repete o processo até encerrar a resposta.</p><div className="next-token"><span>“Para validar o formulário,</span><b> o próximo passo é…”</b><i>→</i></div><small>O texto completo não é selecionado de uma resposta pronta.</small></article>
    </div><div className="context-heading"><div><p className="eyebrow">Contexto útil</p><h2>O que chega à “mesa” do agente</h2></div><p>Relevância vale mais que volume.</p></div><div className="token-flow"><TokenStep icon="layers" title="Entrada" text="Prompt, arquivos, histórico e logs." /><span className="flow-arrow">→</span><TokenStep icon="spark" title="Processamento" text="Contexto analisado pelo modelo." /><span className="flow-arrow">→</span><TokenStep icon="code" title="Saída" text="Resposta, plano, código e explicação." /></div><div className="analogy"><span className="icon-circle"><Icon name="layers" /></span><p>“O contexto é a mesa de trabalho do agente: se faltar uma peça importante, ele precisa adivinhar; se houver informação demais, ele demora para encontrar o que importa.”</p></div></Detail></div>
    <Detail title="Como consultar um modelo e medir o uso real"><p className="detail-intro">Em uma aplicação real, o servidor envia a entrada pela Responses API. A prévia de tokens de entrada pode ser consultada antes; após a resposta, o campo <code>usage</code> informa a utilização real. A chave de API fica no servidor.</p><div className="prompt-box"><pre>{serverUsageExample}</pre><CopyButton value={serverUsageExample} label="Copiar exemplo" /></div><p className="source-note">Referência: <a href="https://developers.openai.com/api/docs/guides/token-counting" target="_blank" rel="noreferrer">OpenAI Docs — contagem de tokens</a>.</p></Detail>
    <TokenPlayground />
  </section>
}

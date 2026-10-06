import { Detail, Icon, PromptBox } from '../components/GuideUI'
import RagPlayground from '../components/RagPlayground'
import PlainLanguage from '../components/PlainLanguage'
import SectionHeading from '../components/SectionHeading'
import { ragNonUseCases, ragPrompt, ragSafeguards, ragScenario, ragStages, ragUseCases } from '../data/rag'
import { plainLanguage } from '../data/plainLanguage'

export default function RagSection() {
  return <section className="rag-section">
    <SectionHeading id="rag" />
    <div className="rag-definition"><Icon name="layers" size={24} /><p><strong>RAG</strong> significa <em>Retrieval-Augmented Generation</em> (geração aumentada por recuperação). Em vez de depender só do conhecimento já presente no modelo, o sistema procura fontes relevantes no momento da pergunta e as inclui no contexto.</p></div>
    <PlainLanguage data={plainLanguage.rag!} />

    <ol className="rag-flow" aria-label="Fluxo de funcionamento do RAG">{ragStages.map((stage, index) => <li key={stage.title}><b>{String(index + 1).padStart(2, '0')}</b><h2>{stage.title}</h2><p>{stage.text}</p></li>)}</ol>

    <article className="rag-example" aria-labelledby="rag-scenario-title">
      <header><div><p className="eyebrow">Cenário ilustrativo</p><h2 id="rag-scenario-title">Uma pergunta encontra evidências antes da resposta</h2></div><span>Sem chamada de API</span></header>
      <div className="rag-query"><small>Pergunta da pessoa</small><p>{ragScenario.question}</p></div>
      <div className="rag-retrieval"><div><small>Trechos candidatos</small><p>Uma busca semântica e filtros de acesso selecionam o contexto mais útil.</p></div><span aria-hidden="true">→</span><div><small>Contexto enviado ao modelo</small><p>Somente os trechos marcados entram na instrução que acompanha a pergunta.</p></div></div>
      <div className="rag-chunks">{ragScenario.chunks.map(chunk => <div key={chunk.source} className={chunk.selected ? 'selected' : ''}><small>{chunk.selected ? 'RECUPERADO' : 'NÃO UTILIZADO'}</small><strong>{chunk.source}</strong><p>“{chunk.excerpt}”</p></div>)}</div>
      <div className="rag-answer"><div><Icon name="spark" size={18} /><small>Resposta com evidência</small></div><p>{ragScenario.answer}</p><span>Fontes: Política de devoluções · v3; Central de ajuda · Trocas</span></div>
      <p className="rag-disclaimer">Os documentos, a seleção e a resposta são simulados para explicar o fluxo. Em produção, a busca, as permissões e chamadas ao modelo devem ocorrer no servidor.</p>
    </article>

    <Detail title="Ver a instrução que acompanha os trechos recuperados"><PromptBox onCopy={ragPrompt}>{ragPrompt}</PromptBox></Detail>
    <div className="rag-decision-grid"><article><h2>Quando faz sentido</h2><ul>{ragUseCases.map(item => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul></article><article><h2>O que RAG não resolve</h2><ul>{ragNonUseCases.map(item => <li key={item}><Icon name="warning" size={16} />{item}</li>)}</ul></article></div>
    <Detail title="Cuidados para um RAG responsável"><ul className="practice-list">{ragSafeguards.map(item => <li key={item}>{item}</li>)}</ul><p className="source-note">Referência: <a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noreferrer">Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</a>.</p></Detail>
    <RagPlayground />
  </section>
}

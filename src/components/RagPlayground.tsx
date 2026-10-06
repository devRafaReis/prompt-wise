import { useState } from 'react'
import { Icon, TextArea } from './GuideUI'
import { illustrativeRagAnswer, ragLabExamples, retrieveIllustrativeChunks } from '../data/rag'

export default function RagPlayground() {
  const [question, setQuestion] = useState<string>(ragLabExamples[0].question)
  const [searched, setSearched] = useState(false)
  const results = retrieveIllustrativeChunks(question)
  const sources = results.map(({ chunk }) => chunk.source)
  const contextPreview = results.length
    ? results.map(({ chunk }) => `[Fonte: ${chunk.source}]\n${chunk.excerpt}`).join('\n\n')
    : 'Nenhum trecho foi recuperado para esta pergunta.'

  function updateQuestion(value: string) {
    setQuestion(value)
    setSearched(false)
  }

  return <section className="rag-playground" aria-labelledby="rag-lab-title">
    <header className="rag-playground-heading"><div><p className="eyebrow">Laboratório prático</p><h2 id="rag-lab-title">Recupere contexto antes de responder</h2></div><span>Simulação local · sem API ou embeddings reais</span></header>
    <div className="rag-playground-grid">
      <div className="rag-playground-panel">
        <div className="rag-playground-step"><b>01</b><span>Faça uma pergunta</span></div>
        <label className="playground-label" htmlFor="rag-question">O que a pessoa quer saber?</label>
        <TextArea id="rag-question" value={question} onChange={event => updateQuestion(event.target.value)} maxLength={240} rows={3} placeholder="Ex.: Qual é o prazo para devolver um pedido?" />
        <div className="prompt-presets" aria-label="Perguntas de exemplo para RAG">{ragLabExamples.map(example => <button key={example.label} type="button" onClick={() => updateQuestion(example.question)}>{example.label}</button>)}</div>
        <button type="button" className="rag-search-button" disabled={!question.trim()} onClick={() => setSearched(true)}><Icon name="layers" size={16} />Buscar trechos relevantes</button>
        <p className="rag-lab-caveat">A busca usa palavras-chave predefinidas, não similaridade vetorial. Serve apenas para tornar a etapa de recuperação visível.</p>
      </div>
      <div className="rag-playground-panel rag-playground-result" aria-live="polite">
        <div className="rag-playground-step"><b>02</b><span>Confira o que foi recuperado</span></div>
        {!searched ? <p className="rag-lab-empty">Faça a busca para ver os trechos selecionados da base simulada.</p> : <>
          <div className="rag-lab-results">{results.length ? results.map(({ chunk, matches }) => <article key={chunk.id}><div><small>RECUPERADO</small><span>{matches.length} termo{matches.length === 1 ? '' : 's'} em comum</span></div><strong>{chunk.source}</strong><p>“{chunk.excerpt}”</p></article>) : <p className="rag-lab-empty">Nenhum trecho corresponde à pergunta. Este é o momento de reconhecer que falta evidência, não de inventar uma resposta.</p>}</div>
          <div className="rag-context-preview"><small>03 · Contexto que seria enviado ao modelo</small><pre>{contextPreview}</pre></div>
          <div className="rag-lab-answer"><div><Icon name="spark" size={17} /><small>Resposta ilustrativa baseada nos trechos</small></div><p>{illustrativeRagAnswer(results.map(result => result.chunk.id))}</p>{sources.length > 0 && <span>Fontes: {sources.join('; ')}</span>}</div>
        </>}
      </div>
    </div>
  </section>
}

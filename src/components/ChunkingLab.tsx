import { useState } from 'react'
import { chunkingQuery, chunkingSource, chunkSizes, createIllustrativeChunks, type ChunkSize } from '../data/chunkingLab'
import { Icon } from './GuideUI'

export default function ChunkingLab() {
  const [size, setSize] = useState<ChunkSize>('medio')
  const [overlap, setOverlap] = useState(true)
  const chunks = createIllustrativeChunks(size, overlap)
  const bestMatch = Math.max(...chunks.map(chunk => chunk.matches))

  return <section className="chunking-lab" aria-labelledby="chunking-lab-title">
    <header><div><p className="eyebrow">Laboratório de chunking</p><h2 id="chunking-lab-title">Divida uma fonte e observe a recuperação</h2></div><span>Divisão por palavras · sem embeddings</span></header>
    <div className="chunking-source"><small>DOCUMENTO ORIGINAL</small><p>{chunkingSource}</p></div>
    <div className="chunking-controls"><fieldset><legend>Tamanho dos trechos</legend>{(Object.entries(chunkSizes) as [ChunkSize, (typeof chunkSizes)[ChunkSize]][]).map(([id, option]) => <button key={id} type="button" aria-pressed={size === id} onClick={() => setSize(id)}>{option.label}</button>)}</fieldset><label className="context-toggle"><input type="checkbox" checked={overlap} onChange={event => setOverlap(event.target.checked)} /><span>Sobrepor 5 palavras</span></label></div>
    <div className="chunking-query"><Icon name="layers" size={17} /><div><small>PERGUNTA DE BUSCA</small><p>{chunkingQuery}</p></div></div>
    <div className="chunk-list" aria-live="polite">{chunks.map((chunk, index) => { const selected = chunk.matches === bestMatch && bestMatch > 0; return <article key={`${size}-${overlap}-${chunk.id}`} className={selected ? 'selected' : ''}><div><b>{String(index + 1).padStart(2, '0')}</b><small>{selected ? 'MAIS RELEVANTE' : 'CANDIDATO'}</small></div><p>{chunk.text}</p></article> })}</div>
    <div className="chunking-insight"><Icon name="check" size={17} /><p><strong>O que observar:</strong> {chunkSizes[size].explanation} A marcação usa apenas correspondência de termos e não mede qualidade real.</p></div>
  </section>
}

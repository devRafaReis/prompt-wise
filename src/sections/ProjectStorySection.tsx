import { useState } from 'react'
import { Detail, Icon } from '../components/GuideUI'
import SectionHeading from '../components/SectionHeading'
import { projectCreationEstimate, projectStories } from '../data/projectStory'

export default function ProjectStorySection() {
  const [selectedId, setSelectedId] = useState(projectStories[0].id)
  const selected = projectStories.find(story => story.id === selectedId) ?? projectStories[0]

  return <section className="story-section">
    <SectionHeading id="bastidores" />
    <article className="story-usage" aria-labelledby="story-usage-title">
      <header><div><p className="eyebrow">Escala da colaboração</p><h2 id="story-usage-title">Agente e consumo estimado</h2></div><span>{projectCreationEstimate.status}</span></header>
      <div className="story-usage-grid">
        {[projectCreationEstimate.agent, projectCreationEstimate.model, projectCreationEstimate.tokens].map(item => <div key={item.label}><small>{item.label}</small><strong>{item.value}</strong><p>{item.detail}</p></div>)}
      </div>
      <Detail title="Como a estimativa foi calculada"><div className="story-estimate-method"><p><strong>Base observável:</strong> {projectCreationEstimate.baseline}</p><p><strong>Ampliação pela iteração:</strong> {projectCreationEstimate.expansion}</p><p><Icon name="warning" size={16} /><span>{projectCreationEstimate.caveat}</span></p></div></Detail>
    </article>
    <div className="story-responsibility"><Icon name="spark" size={20} /><div><p><strong>Ponto de partida:</strong> criar um treinamento navegável sobre IA na programação, hoje construído com React, TypeScript e Vite.</p><p><strong>Evolução:</strong> o projeto cresceu de uma apresentação inicial para um guia com navegação agrupada, módulos conceituais e laboratórios locais.</p><p><strong>Divisão de papéis:</strong> a IA implementou e ajudou a revisar; os objetivos, o feedback e a decisão de continuar vieram da pessoa que conduziu o projeto.</p></div></div>

    <div className="story-selector" role="group" aria-label="Escolha uma etapa da criação do projeto">
      {projectStories.map((story, index) => <button key={story.id} type="button" aria-pressed={story.id === selectedId} aria-controls="story-case" className={story.id === selectedId ? 'selected' : ''} onClick={() => setSelectedId(story.id)}>
        <span>{String(index + 1).padStart(2, '0')} · {story.subtitle}</span>
        <strong>{story.title}</strong>
      </button>)}
    </div>

    <article className="story-panel" id="story-case" aria-live="polite">
      <div className="story-panel-heading"><div><p className="eyebrow">Caso real · {selected.subtitle}</p><h2>{selected.title}</h2></div><span className="story-panel-count">{String(projectStories.findIndex(story => story.id === selected.id) + 1).padStart(2, '0')} / {String(projectStories.length).padStart(2, '0')}</span></div>
      <div className="story-grid">
        <div className="story-card story-request"><span className="story-card-label">01 · Pedido humano</span><p>“{selected.request}”</p></div>
        <div className="story-card story-iteration"><span className="story-card-label">02 · Iteração com IA</span><div className="story-change"><div><small>Antes</small><p>{selected.before}</p></div><span aria-hidden="true">→</span><div><small>Depois</small><p>{selected.after}</p></div></div></div>
        <div className="story-card story-validation"><span className="story-card-label">03 · O que conferir</span><p>{selected.verify}</p></div>
      </div>
      <div className="story-panel-bottom"><p><Icon name="check" size={17} /><span><strong>Aprendizado:</strong> {selected.lesson}</span></p><div className="story-files" aria-label="Arquivos relacionados">{selected.files.map(file => <code key={file}>{file}</code>)}</div></div>
    </article>
    <p className="story-disclaimer">Os pedidos acima são resumos das iterações desta conversa, não transcrições completas ou um histórico automático de commits.</p>
  </section>
}

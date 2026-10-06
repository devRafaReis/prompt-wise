import { Detail, Icon } from '../components/GuideUI'
import EvaluationLab from '../components/EvaluationLab'
import ChunkingLab from '../components/ChunkingLab'
import ModuleDeepDive from '../components/ModuleDeepDive'
import PlainLanguage from '../components/PlainLanguage'
import SectionHeading from '../components/SectionHeading'
import { moduleDeepDives } from '../data/moduleDeepDives'
import { plainLanguage } from '../data/plainLanguage'
import { studyModules, type StudyModuleId } from '../data/studyModules'

export default function StudyModuleSection({ id }: { id: StudyModuleId }) {
  const module = studyModules[id]
  const deepDive = moduleDeepDives[id]

  return <section className="study-module-section">
    <SectionHeading id={id} />
    <div className="study-module-intro"><span>{module.badge}</span><p>{module.introduction}</p></div>
    {plainLanguage[id] && <PlainLanguage data={plainLanguage[id]} />}
    <ol className="study-module-flow" aria-label={`Etapas de ${module.badge}`}>{module.steps.map((step, index) => <li key={step.title}><b>{String(index + 1).padStart(2, '0')}</b><h2>{step.title}</h2><p>{step.text}</p></li>)}</ol>
    {deepDive && <ModuleDeepDive data={deepDive} />}
    <article className="study-module-example"><header><div><p className="eyebrow">{module.example.label}</p><h2>Como aplicar o conceito</h2></div><Icon name="layers" size={22} /></header><div><small>Situação</small><p>{module.example.question}</p></div><span aria-hidden="true">→</span><div><small>Resultado esperado</small><p>{module.example.outcome}</p></div><footer><Icon name="check" size={16} /><p>{module.example.check}</p></footer></article>
    <div className="study-module-guidance"><article><h2>Boas práticas</h2><ul>{module.doItems.map(item => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul></article><article><h2>Evite</h2><ul>{module.avoidItems.map(item => <li key={item}><Icon name="warning" size={16} />{item}</li>)}</ul></article></div>
    <Detail title="Ponto de atenção"><p className="study-module-note">{module.note}</p>{module.source && <p className="source-note">Referência: <a href={module.source.href} target="_blank" rel="noreferrer">{module.source.label}</a>.</p>}</Detail>
    {id === 'embeddings' && <ChunkingLab />}
    {id === 'avaliacao' && <EvaluationLab />}
  </section>
}

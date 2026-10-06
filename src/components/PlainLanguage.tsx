import type { PlainLanguageExplanation } from '../data/plainLanguage'
import { Icon } from './GuideUI'

export default function PlainLanguage({ data }: { data: PlainLanguageExplanation }) {
  return <article className="plain-language">
    <span className="icon-circle"><Icon name="spark" size={19} /></span>
    <div><p className="eyebrow">Em palavras simples</p><h2>{data.title}</h2><p>{data.analogy}</p><small><strong>Onde a analogia termina:</strong> {data.limit}</small></div>
  </article>
}

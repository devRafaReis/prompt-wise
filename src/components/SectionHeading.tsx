import { sectionCopy } from '../data/content'

export default function SectionHeading({ id }: { id: keyof typeof sectionCopy }) {
  const copy = sectionCopy[id]
  return <>
    <p className="eyebrow">{copy.eyebrow}</p>
    <h1>{copy.title}<br /><em>{copy.emphasis}</em></h1>
    {copy.lead && <p className="lead">{copy.lead}</p>}
  </>
}

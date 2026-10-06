import { Icon } from './GuideUI'
import type { ModuleDeepDive as ModuleDeepDiveData } from '../data/moduleDeepDives'

export default function ModuleDeepDive({ data }: { data: ModuleDeepDiveData }) {
  return <article className="module-deep-dive">
    <header className="module-deep-dive-heading">
      <div><p className="eyebrow">{data.eyebrow}</p><h2>{data.title}</h2><p>{data.description}</p></div>
      <Icon name="layers" size={24} />
    </header>

    <div className="module-deep-dive-scenario"><small>Cenário</small><p>{data.scenario}</p></div>

    <div className="module-deep-dive-metrics" aria-label="Indicadores do cenário">
      {data.metrics.map(metric => <div className={metric.tone ? `metric-${metric.tone}` : ''} key={`${metric.value}-${metric.label}`}>
        <strong>{metric.value}</strong><span>{metric.label}</span><p>{metric.detail}</p>
      </div>)}
    </div>

    <ol className="module-deep-dive-sequence" aria-label="Sequência de análise">
      {data.sequence.map((step, index) => <li key={step.title}><b>{String(index + 1).padStart(2, '0')}</b><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}
    </ol>

    <div className="module-deep-dive-table">
      <div className="table-wrap" tabIndex={0} role="region" aria-label={data.table.caption}>
        <table>
          <caption>{data.table.caption}</caption>
          <thead><tr>{data.table.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead>
          <tbody>{data.table.rows.map((row, rowIndex) => <tr key={`${row[0]}-${rowIndex}`}>{row.map((cell, cellIndex) => <td data-label={data.table.columns[cellIndex]} key={`${cellIndex}-${cell}`}>{cellIndex === 0 ? <b>{cell}</b> : cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>

    <footer className="module-deep-dive-footer">
      <div><Icon name="check" size={17} /><p>{data.takeaway}</p></div>
      <small>{data.disclaimer}</small>
      {data.sources && <p className="source-note">Fontes oficiais: {data.sources.map((source, index) => <span key={source.href}>{index > 0 && ' · '}<a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></span>)}.</p>}
    </footer>
  </article>
}

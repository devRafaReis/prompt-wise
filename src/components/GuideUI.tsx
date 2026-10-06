import { useState, type ComponentProps, type ReactNode } from 'react'

export type IconName = 'spark' | 'arrow' | 'check' | 'copy' | 'moon' | 'sun' | 'shield' | 'clock' | 'code' | 'layers' | 'warning'

const paths: Record<IconName, ReactNode> = {
  spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4.2 4.2L19 6.5" />,
  copy: <><rect x="8" y="8" width="11" height="11" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
  moon: <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2m-2.9-7.1-1.4 1.4M6.3 17.7l-1.4 1.4m0-14.2 1.4 1.4m11.4 11.4 1.4 1.4" /></>,
  shield: <path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14" />,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  warning: <><path d="m10.3 4.2-7 12.1A2 2 0 0 0 5 19.3h14a2 2 0 0 0 1.7-3l-7-12.1a2 2 0 0 0-3.4 0Z" /><path d="M12 9v3.5m0 3h.01" /></>,
}

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export function TextArea({ className = '', ...props }: ComponentProps<'textarea'>) {
  return <textarea {...props} className={['text-area', className].filter(Boolean).join(' ')} />
}

export function CopyButton({ value, label = 'Copiar prompt' }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  return <button type="button" className="copy-button" onClick={copy}><Icon name={copied ? 'check' : 'copy'} size={16} />{copied ? 'Copiado!' : label}</button>
}

export function Detail({ title, children, open = false }: { title: string; children: ReactNode; open?: boolean }) {
  return <details className="detail" open={open}><summary>{title}<span>+</span></summary><div className="detail-body">{children}</div></details>
}

export function PromptBox({ children, onCopy }: { children: string; onCopy: string }) {
  return <div className="prompt-box"><pre>{children}</pre><CopyButton value={onCopy} /></div>
}

export function Insight({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return <div className="insight"><span className="icon-circle"><Icon name={icon} /></span><h2>{title}</h2><p>{text}</p></div>
}

export function Model({ title, badge, items }: { title: string; badge: string; items: string[] }) {
  return <div className={'model model-' + title.toLowerCase()}><div><h2>{title}</h2><span>{badge}</span></div><ul>{items.map(item => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul></div>
}

export function TokenStep({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return <div className="token-step"><span className="icon-circle"><Icon name={icon} /></span><h2>{title}</h2><p>{text}</p></div>
}

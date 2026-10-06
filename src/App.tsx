import { useEffect, useMemo, useState } from 'react'
import GuideNavigation from './components/GuideNavigation'
import { Icon } from './components/GuideUI'
import { topics } from './data/training'
import SectionContent from './sections/SectionContent'

export default function App() {
  const [index, setIndex] = useState(0)
  const [dark, setDark] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const current = topics[index]
  const progress = useMemo(() => ((index + 1) / topics.length) * 100, [index])
  const go = (next: number) => { setIndex(Math.max(0, Math.min(topics.length - 1, next))); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const changeDrawer = (open: boolean) => {
    setDrawerOpen(open)
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>(open ? '.sidebar-drawer-close' : '.sidebar-drawer-open')?.focus())
  }

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && drawerOpen) {
        changeDrawer(false)
        return
      }
      const tag = (event.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (event.key === 'ArrowRight') go(index + 1)
      if (event.key === 'ArrowLeft') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, drawerOpen])

  return <div className={`app-shell${drawerOpen ? '' : ' drawer-collapsed'}`}>
    <aside id="guide-drawer" className="sidebar" aria-label="Roteiro do guia" aria-hidden={!drawerOpen}><div className="sidebar-header"><div className="brand"><span><Icon name="spark" size={18} /></span>prompt/wise</div><button type="button" className="sidebar-drawer-close" onClick={() => changeDrawer(false)} aria-controls="guide-drawer" aria-expanded={drawerOpen} aria-label="Recolher navegação lateral" title="Recolher navegação"><Icon name="arrow" size={17} /></button></div><GuideNavigation activeId={current.id} onSelect={go} /><div className="sidebar-foot"><Icon name="arrow" size={16} /> Use ← → para navegar</div></aside>
    <main><header className="topbar"><div className="topbar-start">{!drawerOpen && <button type="button" className="sidebar-drawer-open" onClick={() => changeDrawer(true)} aria-controls="guide-drawer" aria-expanded={drawerOpen}><Icon name="arrow" size={16} /><span>Abrir menu</span></button>}<div className="section-time"><Icon name="layers" size={17} /><span>{current.eyebrow}</span></div></div><button className="theme-button" onClick={() => setDark(value => !value)} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}><Icon name={dark ? 'sun' : 'moon'} size={19} /></button></header>
      <div className="content" key={current.id}><SectionContent id={current.id} /></div>
      <footer><div className="progress-wrap"><div className="progress-label"><span>Progresso do guia</span><b>{index + 1} de {topics.length} tópicos</b></div><div className="progress"><i style={{ width: `${progress}%` }} /></div></div><div className="pagination"><span>{String(index + 1).padStart(2, '0')} <i>/</i> {String(topics.length).padStart(2, '0')}</span><button onClick={() => go(index - 1)} disabled={index === 0}>Anterior</button><button className="next" onClick={() => go(index + 1)} disabled={index === topics.length - 1}>Próximo <Icon name="arrow" size={17} /></button></div></footer>
    </main>
  </div>
}

import { useEffect, useState } from 'react'
import { topicGroups, topics, type TopicId } from '../data/training'

type GuideNavigationProps = {
  activeId: TopicId
  onSelect: (index: number) => void
}

export default function GuideNavigation({ activeId, onSelect }: GuideNavigationProps) {
  const activeGroupId = topicGroups.find(group => group.topicIds.some(topicId => topicId === activeId))?.id ?? null
  const [openGroupId, setOpenGroupId] = useState<string | null>(activeGroupId)
  const welcome = topics[0]
  const openGroup = topicGroups.find(group => group.id === openGroupId)

  useEffect(() => {
    if (activeGroupId) setOpenGroupId(activeGroupId)
  }, [activeGroupId])

  useEffect(() => {
    if (!window.matchMedia('(max-width: 820px)').matches) return

    const activeTopic = document.getElementById(`mobile-topic-${activeId}`)
    const activeGroup = activeGroupId
      ? document.getElementById(`mobile-nav-group-${activeGroupId}`)
      : document.getElementById('mobile-topic-inicio')

    for (const element of [activeGroup, activeTopic]) {
      const container = element?.parentElement
      if (!element || !container) continue
      const left = element.offsetLeft - (container.clientWidth - element.clientWidth) / 2
      container.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
    }
  }, [activeGroupId, activeId, openGroupId])

  function topicButton(topicId: TopicId, surface: 'desktop' | 'mobile') {
    const topicIndex = topics.findIndex(topic => topic.id === topicId)
    const topic = topics[topicIndex]
    const active = topic.id === activeId

    return <button
      id={surface === 'mobile' ? `mobile-topic-${topic.id}` : undefined}
      key={`${surface}-${topic.id}`}
      type="button"
      data-topic-id={topic.id}
      className={`topic-button${active ? ' active' : ''}`}
      onClick={() => onSelect(topicIndex)}
      aria-current={active ? 'step' : undefined}
    >
      <span>{String(topicIndex).padStart(2, '0')}</span>
      <strong>{topic.title}</strong>
      <small>tópico</small>
    </button>
  }

  function groupButton(group: (typeof topicGroups)[number], surface: 'desktop' | 'mobile') {
    const open = openGroupId === group.id
    const containsActive = group.id === activeGroupId
    const prefix = surface === 'mobile' ? 'mobile-' : ''

    return <button
      id={`${prefix}nav-group-${group.id}`}
      type="button"
      data-group-id={group.id}
      className={`nav-group-trigger${containsActive ? ' contains-active' : ''}`}
      aria-expanded={open}
      aria-controls={surface === 'mobile' ? 'mobile-nav-items' : `nav-items-${group.id}`}
      onClick={() => setOpenGroupId(current => current === group.id ? null : group.id)}
    >
      <strong>{group.title}</strong>
      <small>{group.topicIds.length}</small>
      <span aria-hidden="true">›</span>
    </button>
  }

  return <nav className="sidebar-nav" aria-label="Tópicos do guia">
    <div className="nav-desktop">
      <p>GUIA DE REFERÊNCIA</p>
      <button type="button" data-topic-id={welcome.id} className={`topic-button nav-home${activeId === welcome.id ? ' active' : ''}`} onClick={() => onSelect(0)} aria-current={activeId === welcome.id ? 'step' : undefined}><span>00</span><strong>{welcome.title}</strong><small>início</small></button>
      <div className="nav-groups">{topicGroups.map(group => {
        const containsActive = group.id === activeGroupId
        return <section className={`nav-group${containsActive ? ' contains-active' : ''}`} key={group.id} aria-labelledby={`nav-group-${group.id}`}>
          {groupButton(group, 'desktop')}
          <div id={`nav-items-${group.id}`} className="nav-group-items" hidden={openGroupId !== group.id}>{group.topicIds.map(topicId => topicButton(topicId, 'desktop'))}</div>
        </section>
      })}</div>
    </div>

    <div className="nav-mobile">
      <div className="mobile-nav-groups" aria-label="Grupos do guia">
        <button id="mobile-topic-inicio" type="button" data-topic-id={welcome.id} className={`topic-button nav-home${activeId === welcome.id ? ' active' : ''}`} onClick={() => onSelect(0)} aria-current={activeId === welcome.id ? 'step' : undefined}><span>00</span><strong>{welcome.title}</strong><small>início</small></button>
        {topicGroups.map(group => <span className="mobile-group-button" key={`mobile-${group.id}`}>{groupButton(group, 'mobile')}</span>)}
      </div>
      <div id="mobile-nav-items" className="mobile-subtopics" hidden={!openGroup} aria-label={openGroup ? `Subtópicos de ${openGroup.title}` : 'Subtópicos'}>
        {openGroup?.topicIds.map(topicId => topicButton(topicId, 'mobile'))}
      </div>
    </div>
  </nav>
}

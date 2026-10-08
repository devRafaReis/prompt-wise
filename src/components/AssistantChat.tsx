import { useState } from 'react'
import { Icon, TextArea } from './GuideUI'
import { assistantChatIntro, assistantChatStarters, type ChatMessage } from '../data/assistantChat'
import { sensitiveDataPattern } from '../data/promptRefiner'

type ChatResponse = { answer?: string; error?: string }

export default function AssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = draft.trim()
    if (!content || isSending) return
    if (sensitiveDataPattern.test(content)) {
      setError('Remova chaves, senhas, dados pessoais ou informações confidenciais antes de enviar a mensagem.')
      return
    }

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content }
    const history = messages.slice(-8).map(({ role, content: previousContent }) => ({ role, content: previousContent }))
    setMessages(current => [...current, userMessage])
    setDraft('')
    setError(null)
    setIsSending(true)

    try {
      const response = await fetch('/api/conversar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history }),
      })
      const isJson = response.headers.get('content-type')?.includes('application/json')
      const result = isJson ? await response.json() as ChatResponse : {}
      if (!response.ok || !result.answer) throw new Error(result.error ?? 'Não foi possível responder agora.')
      setMessages(current => [...current, { id: crypto.randomUUID(), role: 'assistant', content: result.answer! }])
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Não foi possível responder agora.')
    } finally {
      setIsSending(false)
    }
  }

  return <section className="assistant-chat" aria-labelledby="assistant-chat-title">
    <header>
      <div><p className="eyebrow">Conversa guiada</p><h2 id="assistant-chat-title">Pergunte à IA</h2></div>
      {messages.length > 0 && <button type="button" className="assistant-chat-reset" onClick={() => { setMessages([]); setError(null) }}>Limpar conversa</button>}
    </header>
    <p className="assistant-chat-intro">{assistantChatIntro}</p>
    <div className="assistant-chat-starters" aria-label="Sugestões de perguntas">{assistantChatStarters.map(starter => <button key={starter} type="button" onClick={() => { setDraft(starter); setError(null) }} disabled={isSending}>{starter}</button>)}</div>
    <div className="assistant-chat-log" role="log" aria-live="polite" aria-busy={isSending} aria-label="Conversa com a assistente">
      {messages.length === 0 ? <div className="assistant-chat-empty"><Icon name="spark" size={22} /><p>Escreva uma pergunta ou escolha uma sugestão para começar.</p></div> : messages.map(message => <article key={message.id} className={`assistant-chat-message ${message.role}`}><span>{message.role === 'user' ? 'Você' : 'Assistente'}</span><p>{message.content}</p></article>)}
      {isSending && <div className="assistant-chat-thinking"><Icon name="clock" size={16} />Pensando na resposta...</div>}
    </div>
    {error && <p className="assistant-chat-error" role="alert"><Icon name="warning" size={16} />{error}</p>}
    <form className="assistant-chat-form" onSubmit={sendMessage}>
      <label htmlFor="assistant-chat-input">Sua pergunta</label>
      <TextArea id="assistant-chat-input" value={draft} onChange={event => { setDraft(event.target.value); setError(null) }} placeholder="Ex.: como validar uma alteração feita com IA?" disabled={isSending} />
      <div><small>Não envie dados pessoais, credenciais ou conteúdo confidencial.</small><button type="submit" disabled={!draft.trim() || isSending}>{isSending ? 'Enviando...' : 'Enviar pergunta'} <Icon name="arrow" size={16} /></button></div>
    </form>
    <p className="source-note">A conversa usa a Responses API no servidor com <code>gpt-6-luna</code> quando a Vercel Function está configurada. <a href="https://developers.openai.com/api/docs/models/gpt-6-luna" target="_blank" rel="noreferrer">Documentação oficial</a>.</p>
  </section>
}

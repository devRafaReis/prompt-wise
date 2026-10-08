export const assistantChatIntro = 'Converse com a IA sobre desenvolvimento e uso responsável de IA. As mensagens desta conversa ficam apenas nesta aba; ao enviar, o texto segue para o servidor configurado na Vercel.'

export const assistantChatStarters = [
  'Como posso revisar código gerado por IA?',
  'Que contexto devo dar antes de pedir uma alteração?',
  'Quando devo usar RAG em vez de um prompt maior?',
] as const

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

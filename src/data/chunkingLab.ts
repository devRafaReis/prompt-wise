export type ChunkSize = 'curto' | 'medio' | 'longo'

export const chunkingSource = `A política de devoluções permite solicitar a devolução em até 30 dias corridos após a entrega. O produto deve ser enviado com os acessórios recebidos. Itens com defeito passam por uma análise específica antes da definição sobre troca ou reembolso. O prazo atualizado de entrega fica disponível no rastreamento do pedido após a confirmação do pagamento. A segunda via da nota fiscal pode ser obtida na página do pedido depois da emissão.`

export const chunkingQuery = 'Qual é o prazo para solicitar uma devolução?'

export const chunkSizes: Record<ChunkSize, { label: string; words: number; explanation: string }> = {
  curto: { label: 'Trechos curtos', words: 10, explanation: 'Mais precisão local, mas uma ideia pode ficar separada de sua condição ou complemento.' },
  medio: { label: 'Trechos médios', words: 22, explanation: 'Equilibra a frase principal com contexto próximo neste exemplo.' },
  longo: { label: 'Trechos longos', words: 44, explanation: 'Preserva mais contexto, mas também pode carregar informação irrelevante para a pergunta.' },
}

export function createIllustrativeChunks(size: ChunkSize, overlap: boolean) {
  const words = chunkingSource.split(/\s+/)
  const width = chunkSizes[size].words
  const step = overlap ? Math.max(1, width - 5) : width
  const queryTerms = ['prazo', 'solicitar', 'devolução']

  return Array.from({ length: Math.ceil(Math.max(1, words.length - (overlap ? 5 : 0)) / step) }, (_, index) => {
    const start = index * step
    const text = words.slice(start, start + width).join(' ')
    const normalized = text.toLocaleLowerCase('pt-BR')
    return { id: index, text, matches: queryTerms.filter(term => normalized.includes(term)).length }
  }).filter(chunk => chunk.text)
}

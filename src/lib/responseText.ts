type ResponseContent = { type?: unknown; text?: unknown }
type ResponseItem = { type?: unknown; content?: unknown }

/** Extrai texto de uma resposta REST da Responses API. Uso exclusivo no servidor. */
export function extractResponseText(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const output = (value as { output?: unknown }).output
  if (!Array.isArray(output)) return null

  const text = output
    .filter((item): item is ResponseItem => Boolean(item && typeof item === 'object'))
    .filter(item => item.type === 'message' && Array.isArray(item.content))
    .flatMap(item => item.content as ResponseContent[])
    .filter((content): content is ResponseContent & { type: 'output_text'; text: string } => content.type === 'output_text' && typeof content.text === 'string')
    .map(content => content.text.trim())
    .filter(Boolean)
    .join('\n')

  return text || null
}

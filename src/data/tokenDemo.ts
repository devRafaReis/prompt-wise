export type AnswerLength = 'curta' | 'detalhada'

export const tokenExamples = [
  { label: 'Explicar React', prompt: 'Explique useEffect em uma frase.' },
  { label: 'Criar um tipo', prompt: 'Crie um tipo TypeScript para um usuário com nome e e-mail.' },
  { label: 'Entender um erro', prompt: 'Explique o erro 401 Unauthorized em uma API.' },
] as const

export const extraContext = 'Trecho ilustrativo das regras do projeto: use React + TypeScript, explique em português claro e não inclua segredos no frontend.'

export const exampleHistory = [
  { role: 'user', content: 'Estamos criando um formulário de cadastro em React.' },
  { role: 'assistant', content: 'Certo. Vou considerar acessibilidade e validação dos campos.' },
] as const

export const exampleFile = 'Trecho relevante de src/LoginForm.tsx: o formulário usa estado local e já possui campos de e-mail e senha.'

export const exampleTool = {
  type: 'function',
  name: 'consultar_documentacao',
  description: 'Consulta a documentação aprovada do projeto.',
  parameters: {
    type: 'object',
    properties: { termo: { type: 'string' } },
    required: ['termo'],
    additionalProperties: false,
  },
} as const

export const answerInstructions: Record<AnswerLength, string> = {
  curta: 'Responda em português do Brasil, de forma clara e em uma frase curta.',
  detalhada: 'Responda em português do Brasil, de forma clara, com uma explicação e um exemplo breve.',
}

export const serverUsageExample = `// Exemplo para um servidor Node.js; nunca exponha a chave no navegador.
import OpenAI from 'openai'

const client = new OpenAI() // lê OPENAI_API_KEY do ambiente
const input = 'Explique useEffect em uma frase.'

const preview = await client.responses.inputTokens.count({
  model: 'gpt-6.1-sol', input,
})

const response = await client.responses.create({
  model: 'gpt-6.1-sol', input,
})

console.log('Entrada prevista:', preview.input_tokens)
console.log('Resposta:', response.output_text)
console.log('Uso real:', response.usage?.input_tokens, response.usage?.output_tokens)`

export function exampleResponseChunks(prompt: string, length: AnswerLength): string[] {
  const question = prompt.toLocaleLowerCase('pt-BR')

  if (question.includes('useeffect')) {
    return length === 'curta'
      ? ['useEffect', ' executa um efeito', ' após a renderização', ' para sincronizar o componente', ' com algo externo.']
      : ['useEffect executa um efeito após a renderização.', ' Ele é útil para sincronizar o componente com algo externo,', ' como uma assinatura de eventos.', ' Exemplo: adicionar um listener e removê-lo na função de limpeza.']
  }
  if (question.includes('typescript') || question.includes('tipo ')) {
    return length === 'curta'
      ? ['type Usuario', ' = { nome: string;', ' email: string };']
      : ['Um tipo possível é:', '\n\ntype Usuario = {', '\n  nome: string;', '\n  email: string;', '\n};', '\n\nDepois, confirme se os campos correspondem ao contrato real.']
  }
  if (question.includes('401') || question.includes('unauthorized')) {
    return length === 'curta'
      ? ['401 Unauthorized', ' indica que a requisição', ' não apresentou autenticação válida.']
      : ['401 Unauthorized indica ausência ou falha de autenticação.', ' Verifique se o token foi enviado,', ' se ainda é válido', ' e se o endpoint exige outro mecanismo de autenticação.']
  }

  const subject = prompt.trim().replace(/\s+/g, ' ').slice(0, 82)
  return [
    `Para responder a “${subject}${prompt.trim().length > 82 ? '…' : ''}”,`,
    ' o modelo analisaria o contexto enviado',
    ' e geraria a saída em sequência.',
    ' O conteúdo real exige uma chamada ao modelo.',
  ]
}

export type PromptCheck = {
  id: string
  label: string
  description: string
  question: string
  patterns: RegExp[]
}

export type PromptAgentFeedback = {
  resumo: string
  perguntas: string[]
  promptSugerido: string
  cuidado: string
}

export const promptChecks: readonly PromptCheck[] = [
  {
    id: 'objetivo',
    label: 'Objetivo',
    description: 'Diz claramente o que deve ser feito.',
    question: 'Qual resultado concreto você quer obter com este pedido?',
    patterns: [/\b(crie|implemente|revise|analise|explique|gere|corrija|adicione|remova|compare|liste|resuma|escreva|faça)\b/i],
  },
  {
    id: 'contexto',
    label: 'Contexto',
    description: 'Situa o projeto, público, arquivo, dado ou cenário.',
    question: 'Que contexto mínimo a ferramenta precisa conhecer para não adivinhar?',
    patterns: [/\b(contexto|projeto|aplicação|aplicacao|arquivo|repositório|repositorio|usuário|usuario|cliente|frontend|backend|react|typescript|api|banco|tabela|equipe)\b/i],
  },
  {
    id: 'critério',
    label: 'Critérios de sucesso',
    description: 'Permite verificar se o resultado ficou adequado.',
    question: 'Como você vai verificar que a resposta ou alteração está correta?',
    patterns: [/\b(aceitação|aceitacao|critério|criterio|deve|valid[ae]|teste|sucesso|pronto|esperado|obrigatório|obrigatorio)\b/i],
  },
  {
    id: 'formato',
    label: 'Formato de entrega',
    description: 'Especifica como a resposta deve vir.',
    question: 'Em que formato você quer receber a entrega: plano, código, tabela, JSON ou explicação?',
    patterns: [/\b(formato|json|markdown|tabela|lista|passo a passo|código|codigo|componente|diff|resposta|entregue)\b/i],
  },
  {
    id: 'limites',
    label: 'Limites e cuidados',
    description: 'Evita escopo excessivo e ações arriscadas.',
    question: 'O que não pode mudar, quais dependências evitar e que cuidados de segurança são necessários?',
    patterns: [/\b(não|nao|sem|apenas|limite|restrição|restricao|não altere|nao altere|não instale|nao instale|segurança|seguranca|privacidade)\b/i],
  },
]

export const sensitiveDataPattern = /\b(sk-[\w-]{8,}|api[_ -]?key|token\s*[:=]|senha\s*[:=]|password\s*[:=]|bearer\s+[\w.-]+|cpf\s*[:=]|cart[aã]o\s*[:=])\b/i

export const promptRefinerTemplate = `Objetivo:\n[resultado concreto que preciso]\n\nContexto:\n[projeto, público, arquivos ou dados relevantes]\n\nCritérios de sucesso:\n[como validar a entrega]\n\nFormato de entrega:\n[ex.: plano curto, diff ou JSON]\n\nLimites e cuidados:\n[o que não mudar; dados a proteger; dependências a evitar]`

export const promptRefinerIntro = 'A checagem inicial usa regras locais por palavras e expressões. Ao pedir a sugestão do assistente, o rascunho sem dados sensíveis é enviado ao servidor para uma resposta gerada por IA.'

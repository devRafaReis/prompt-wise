export const evaluationCase = {
  request: '“Posso devolver um produto 45 dias depois da entrega?”',
  context: 'Política disponível: devoluções podem ser solicitadas em até 30 dias corridos após a entrega.',
  criteria: [
    { id: 'evidence', label: 'Usa a evidência fornecida' },
    { id: 'limits', label: 'Não inventa exceções' },
    { id: 'clarity', label: 'Responde com clareza' },
    { id: 'next-step', label: 'Oferece próximo passo seguro' },
  ],
} as const

export const evaluationResponses = [
  {
    id: 'a',
    title: 'Resposta A',
    text: 'Sim. Normalmente a loja aceita devoluções em até 60 dias, então você ainda pode devolver o produto.',
    results: { evidence: false, limits: false, clarity: true, 'next-step': false },
    explanation: 'Parece direta, mas ignora a política fornecida e inventa um prazo de 60 dias.',
  },
  {
    id: 'b',
    title: 'Resposta B',
    text: 'A política informa prazo de até 30 dias corridos. Com 45 dias, não há evidência de que a devolução seja aceita; confirme com o atendimento se existe alguma condição específica para o caso.',
    results: { evidence: true, limits: true, clarity: true, 'next-step': true },
    explanation: 'Usa a fonte disponível, deixa o limite explícito e sugere uma verificação sem prometer uma exceção.',
  },
] as const

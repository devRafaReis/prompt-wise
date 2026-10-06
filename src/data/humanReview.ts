export type ReviewDecision = 'continue' | 'approve' | 'block'

export const reviewDecisions = [
  { id: 'continue', label: 'Continuar com registro' },
  { id: 'approve', label: 'Pausar para aprovação' },
  { id: 'block', label: 'Bloquear ação' },
] as const

export const humanReviewScenarios = [
  { id: 'docs', title: 'Consultar documentação pública', risk: 'Baixo', action: 'Ler uma página oficial já aprovada para conferir um detalhe técnico.', recommended: 'continue', explanation: 'É uma leitura reversível de fonte permitida. Ainda vale registrar origem e resultado.' },
  { id: 'email', title: 'Enviar mensagem externa', risk: 'Médio', action: 'Enviar automaticamente um e-mail ao cliente em nome da equipe.', recommended: 'approve', explanation: 'A ação representa a organização e cria um efeito externo; a pessoa deve revisar destinatário e conteúdo.' },
  { id: 'deploy', title: 'Publicar em produção', risk: 'Alto', action: 'Executar o deploy de uma alteração depois que o build passou.', recommended: 'approve', explanation: 'O build é evidência, não autorização. Publicação exige uma decisão explícita e rastreável.' },
  { id: 'export', title: 'Exportar dados privados', risk: 'Crítico', action: 'Copiar dados de clientes para um serviço externo não aprovado para “ajudar na análise”.', recommended: 'block', explanation: 'O destino não é confiável nem autorizado. A ação deve ser impedida, não apenas confirmada.' },
] as const satisfies readonly { id: string; title: string; risk: string; action: string; recommended: ReviewDecision; explanation: string }[]

export const approvalPrinciples = [
  'Considere reversibilidade, alcance, dados envolvidos e efeito externo.',
  'Mostre à pessoa exatamente o que será enviado, alterado ou executado.',
  'A aprovação deve ser específica para a ação e expirar quando o contexto mudar.',
  'Bloqueios técnicos continuam necessários mesmo quando há revisão humana.',
] as const

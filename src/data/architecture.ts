export const architectureScenarios = [
  {
    id: 'chat',
    label: 'Chat simples',
    description: 'Gerar uma resposta usando apenas instruções e a entrada enviada.',
    steps: [
      { layer: 'Interface', title: 'Coleta a pergunta', text: 'Mostra estados de envio, erro e resposta. Não contém a chave da API.' },
      { layer: 'Servidor', title: 'Valida e prepara', text: 'Autentica, limita a entrada, aplica instruções e usa credenciais protegidas.' },
      { layer: 'Modelo', title: 'Gera a saída', text: 'Recebe somente o contexto necessário e devolve o resultado ao servidor.' },
      { layer: 'Servidor', title: 'Filtra e registra', text: 'Trata erros e registra metadados necessários antes de responder à interface.' },
    ],
  },
  {
    id: 'rag',
    label: 'Aplicação com RAG',
    description: 'Recuperar evidências autorizadas antes de pedir a resposta.',
    steps: [
      { layer: 'Interface', title: 'Envia pergunta e identidade', text: 'A sessão identifica quem pergunta; permissões não são decididas no navegador.' },
      { layer: 'Servidor', title: 'Aplica acesso', text: 'Valida a sessão e define quais fontes podem participar da busca.' },
      { layer: 'Recuperação', title: 'Busca trechos', text: 'Consulta o índice, filtra resultados e preserva origem, versão e permissão.' },
      { layer: 'Modelo', title: 'Responde com fontes', text: 'Recebe pergunta, instruções e poucos trechos relevantes; a aplicação confere a saída.' },
    ],
  },
  {
    id: 'agente',
    label: 'Aplicação com agente',
    description: 'Executar um objetivo em etapas usando ferramentas controladas.',
    steps: [
      { layer: 'Interface', title: 'Define objetivo e limites', text: 'A pessoa acompanha progresso e decide aprovações solicitadas.' },
      { layer: 'Servidor', title: 'Cria e acompanha a tarefa', text: 'Controla identidade, orçamento, eventos, cancelamento e políticas.' },
      { layer: 'Agente', title: 'Planeja e usa ferramentas', text: 'O ciclo consulta resultados e escolhe o próximo passo permitido.' },
      { layer: 'Ambiente', title: 'Executa com isolamento', text: 'Arquivos, comandos e serviços ficam limitados ao ambiente e às permissões concedidas.' },
    ],
  },
] as const

export const architectureRules = [
  'Segredos e chamadas reais ficam no servidor ou em infraestrutura protegida.',
  'Autenticação identifica a pessoa; autorização limita dados e ações disponíveis.',
  'Ferramentas recebem o menor privilégio necessário e ações sensíveis pedem aprovação.',
  'Logs preservam rastreabilidade sem copiar conteúdo pessoal ou credenciais por padrão.',
] as const

export const aiApproaches = [
  {
    id: 'modelo',
    title: 'Modelo generativo',
    kind: 'Capacidade base',
    question: '“O que responder ou criar?”',
    description: 'Recebe contexto e produz texto, código, imagem ou outro conteúdo. Sozinho, não busca dados privados nem executa ações externas.',
    usage: {
      where: 'Chat do provedor, recurso de uma aplicação ou assistente no editor.',
      needs: 'Acesso ao modelo, instrução, contexto e, numa integração, backend com credencial protegida.',
      flow: 'A pessoa ou aplicação envia contexto e pedido; o modelo devolve conteúdo para uso ou revisão.',
    },
    example: 'Explicar um erro, resumir um texto ou criar um primeiro rascunho.',
  },
  {
    id: 'rag',
    title: 'RAG',
    kind: 'Técnica de contexto',
    question: '“Quais fontes ajudam a responder?”',
    description: 'Recupera trechos relevantes de fontes aprovadas e os acrescenta ao contexto antes da geração.',
    usage: {
      where: 'Busca interna, chat com documentos, suporte ou assistente de conhecimento.',
      needs: 'Fontes preparadas, ingestão e divisão em trechos, índice de busca e backend para recuperar e montar o contexto.',
      flow: 'A pergunta busca trechos; o backend envia pergunta e evidências ao modelo; a resposta apresenta as fontes.',
    },
    example: 'Responder sobre uma política interna citando os documentos encontrados.',
  },
  {
    id: 'agente',
    title: 'Agente',
    kind: 'Sistema orientado a objetivos',
    question: '“Quais passos e ferramentas usar?”',
    description: 'Combina modelo, instruções e ferramentas em um ciclo de decisão. Pode ler resultados, ajustar o plano e solicitar aprovação.',
    usage: {
      where: 'VS Code ou outra IDE, terminal, interface web, pipeline de CI ou aplicação própria.',
      needs: 'Modelo, instruções, ferramentas, permissões limitadas, ambiente de execução e pontos de aprovação.',
      flow: 'A pessoa define o objetivo; o agente inspeciona, usa ferramentas, verifica resultados e devolve evidências.',
    },
    example: 'Investigar um bug, editar arquivos, executar validações e resumir as mudanças.',
  },
  {
    id: 'workflow',
    title: 'Workflow com IA',
    kind: 'Orquestração previsível',
    question: '“Qual sequência definida executar?”',
    description: 'Encadeia etapas conhecidas e regras explícitas. O modelo participa de pontos específicos, mas a aplicação controla o caminho.',
    usage: {
      where: 'Backend, automação de chamados, pipeline documental ou plataforma de processos.',
      needs: 'Orquestrador, regras, integrações, filas ou agendamentos, tratamento de falhas e chamadas de IA delimitadas.',
      flow: 'Um gatilho inicia etapas predefinidas; cada saída é validada antes de seguir para a próxima etapa.',
    },
    example: 'Classificar um chamado, gerar um resumo e encaminhar para a fila correspondente.',
  },
  {
    id: 'preditiva',
    title: 'IA preditiva',
    kind: 'Classificação ou previsão',
    question: '“Qual classe, risco ou valor estimar?”',
    description: 'Aprende padrões para classificar ou prever resultados. Não precisa produzir linguagem natural nem operar em formato de conversa.',
    usage: {
      where: 'Serviço de pontuação no backend, processamento em lote, monitoramento ou apoio a decisões.',
      needs: 'Dados históricos representativos, variáveis definidas, treinamento e validação, serviço de inferência e monitoramento.',
      flow: 'Dados viram variáveis de entrada; o modelo calcula uma classe ou pontuação; regras do produto decidem como usá-la.',
    },
    example: 'Detectar fraude, estimar demanda ou classificar mensagens como spam.',
  },
  {
    id: 'multimodal',
    title: 'IA multimodal',
    kind: 'Tipos de entrada e saída',
    question: '“Quais modalidades compreender ou gerar?”',
    description: 'Trabalha com combinações de texto, imagem, áudio ou vídeo. É uma capacidade que pode existir em modelos, agentes e workflows.',
    usage: {
      where: 'Chat, aplicativo móvel, análise de documentos, voz ou assistente no editor.',
      needs: 'Modelo compatível com a modalidade, captura ou envio de arquivos, limites de formato e controles de privacidade.',
      flow: 'A aplicação envia arquivo ou mídia com a instrução; o modelo interpreta ou gera a saída na modalidade permitida.',
    },
    example: 'Interpretar uma captura de tela e explicar o problema encontrado.',
  },
] as const

export const agentRagComparison = [
  { aspect: 'Objetivo principal', agent: 'Concluir uma tarefa em etapas.', rag: 'Encontrar evidências para compor contexto.' },
  { aspect: 'Decisão', agent: 'Escolhe próximos passos dentro dos limites disponíveis.', rag: 'Executa um fluxo de recuperação definido pela aplicação.' },
  { aspect: 'Ferramentas', agent: 'Pode consultar, editar, executar e pedir aprovação.', rag: 'Normalmente busca e entrega trechos; não age por conta própria.' },
  { aspect: 'Relação entre eles', agent: 'Pode usar RAG como uma de suas ferramentas.', rag: 'Pode funcionar sem agente, dentro de uma pergunta e resposta.' },
] as const

export const combinedExample = [
  { actor: 'Pessoa', text: '“Atualize o README conforme o padrão interno e valide o projeto.”' },
  { actor: 'Agente', text: 'Divide o objetivo em consultar o padrão, editar o arquivo e executar a validação.' },
  { actor: 'RAG', text: 'Recupera apenas os trechos relevantes do padrão interno, com origem e versão.' },
  { actor: 'Agente', text: 'Usa a evidência, altera o README, executa o build e apresenta o resultado para revisão.' },
] as const

export const decisionApproaches = [
  { id: 'modelo', label: 'Modelo generativo' },
  { id: 'rag', label: 'RAG' },
  { id: 'agente', label: 'Agente' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'preditiva', label: 'IA preditiva' },
  { id: 'multimodal', label: 'IA multimodal' },
] as const

export const decisionScenarios = [
  { id: 'politica', title: 'Política interna', situation: 'Responder sobre férias usando documentos internos atuais e citando a fonte.', recommended: 'rag', reason: 'A necessidade principal é recuperar conhecimento privado, atual e verificável antes da resposta.' },
  { id: 'bug', title: 'Investigar um bug', situation: 'Ler arquivos, formular hipóteses, editar o código e executar o build.', recommended: 'agente', reason: 'A tarefa exige decidir etapas e usar ferramentas com resultados que influenciam o próximo passo.' },
  { id: 'chamados', title: 'Triar chamados', situation: 'Classificar, resumir e encaminhar cada chamado por uma sequência estável.', recommended: 'workflow', reason: 'O caminho é conhecido e deve permanecer previsível; a IA participa apenas de etapas delimitadas.' },
  { id: 'fraude', title: 'Estimar risco', situation: 'Calcular a probabilidade de uma transação ser fraudulenta a partir de padrões históricos.', recommended: 'preditiva', reason: 'O resultado esperado é uma classificação ou estimativa, não conteúdo generativo nem execução autônoma.' },
  { id: 'captura', title: 'Analisar interface', situation: 'Receber uma captura de tela e explicar o problema visual encontrado.', recommended: 'multimodal', reason: 'A entrada combina imagem e texto; a capacidade multimodal é essencial para interpretar a tela.' },
  { id: 'rascunho', title: 'Criar um rascunho', situation: 'Transformar notas já fornecidas em um comunicado curto, sem buscar dados ou agir em sistemas.', recommended: 'modelo', reason: 'A necessidade é gerar texto a partir do contexto disponível, sem recuperação ou ferramentas.' },
] as const

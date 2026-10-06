export type TechniqueId = 'prompt' | 'rag' | 'ajuste'

export const techniques = [
  { id: 'prompt', title: 'Prompt e exemplos', focus: 'Instrução e comportamento na chamada', useWhen: 'O modelo já tem o conhecimento necessário, mas precisa de objetivo, formato, limites ou poucos exemplos melhores.', tradeoff: 'É rápido de iterar, mas instruções extensas aumentam contexto e podem não resolver inconsistência recorrente.' },
  { id: 'rag', title: 'RAG', focus: 'Contexto atual, privado ou citável', useWhen: 'A resposta depende de documentos que mudam, dados proprietários ou evidências que precisam acompanhar a saída.', tradeoff: 'Adiciona indexação, permissões e uma nova camada para avaliar: a recuperação.' },
  { id: 'ajuste', title: 'Ajuste especializado', focus: 'Consistência aprendida para uma tarefa', useWhen: 'Avaliações mostram falhas repetidas de formato ou comportamento e existe um conjunto representativo de bons exemplos.', tradeoff: 'Exige dados de qualidade, validação separada, operação de treinamento e disponibilidade no provedor escolhido.' },
] as const satisfies readonly { id: TechniqueId; title: string; focus: string; useWhen: string; tradeoff: string }[]

export const techniqueScenarios = [
  { id: 'format', title: 'Formato inconsistente', problem: 'O modelo conhece a tarefa, mas às vezes não devolve o JSON no contrato pedido.', recommended: 'prompt', reason: 'Comece tornando o contrato explícito, usando saída estruturada quando disponível e avaliando exemplos antes de aumentar a complexidade.' },
  { id: 'policy', title: 'Política muda todo mês', problem: 'As respostas precisam usar a versão atual da política interna e mostrar a fonte.', recommended: 'rag', reason: 'O problema é falta de contexto atual e proprietário; recuperar a versão autorizada é mais adequado que tentar gravá-la no comportamento.' },
  { id: 'style', title: 'Padrão repetitivo em escala', problem: 'Mesmo após bons prompts e avaliações, milhares de entradas similares ainda variam no formato especializado.', recommended: 'ajuste', reason: 'A hipótese é de consistência de comportamento. Um ajuste pode ser investigado se houver dados representativos e suporte do provedor.' },
] as const satisfies readonly { id: string; title: string; problem: string; recommended: TechniqueId; reason: string }[]

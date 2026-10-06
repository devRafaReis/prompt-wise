// Conteúdo editorial do guia. Componentes de src/sections cuidam apenas da apresentação.
export const sectionCopy = {
  abertura: { eyebrow: 'Ponto de partida', title: 'IA acelera tarefas.', emphasis: 'Responsabilidade não.', lead: 'O agente pode escrever, explicar e sugerir. A pessoa desenvolvedora continua responsável por entender o problema, validar a solução e decidir o que entra no projeto.' },
  prompts: { eyebrow: 'Como pedir bem', title: 'Um bom prompt diminui', emphasis: 'a adivinhação.', lead: 'Pedidos vagos costumam gerar respostas genéricas. Dê ao agente um problema com bordas claras.' },
  modelos: { eyebrow: 'Capacidade × escopo × custo', title: 'Escolha o agente pelo', emphasis: 'tipo de decisão.', lead: 'O nome do modelo indica uma família, mas a versão e o esforço de raciocínio também mudam o resultado. Comece pelo agente mais leve que atende ao nível de risco da tarefa.' },
  regras: { eyebrow: 'Contexto persistente do repositório', title: 'Arquivos Markdown dão', emphasis: 'limites ao agente.', lead: '' },
  revisao: { eyebrow: 'Segunda opinião', title: 'IA revisa junto.', emphasis: 'Não aprova sozinha.', lead: 'Use o agente como um par extra de olhos; a revisão final ainda exige contexto do produto e do time.' },
  tokens: { eyebrow: 'Tokens, geração e contexto', title: 'Da sua pergunta', emphasis: 'à resposta, passo a passo.', lead: 'Digite uma frase para ver o que seria enviado ao modelo, como a saída aparece em sequência e por que entrada e resposta consomem tokens.' },
  mapa: { eyebrow: 'Conceitos que se combinam', title: 'Modelo, RAG e agente', emphasis: 'não são a mesma coisa.', lead: 'Entenda o papel de cada abordagem, o que ela acrescenta ao sistema e quando vale combiná-las.' },
  rag: { eyebrow: 'Recuperação aumentada por geração', title: 'RAG busca evidências', emphasis: 'antes de responder.', lead: 'O modelo recebe a pergunta acompanhada de trechos recuperados de fontes aprovadas. Isso torna a resposta mais situável e auditável, mas não elimina a necessidade de verificar as fontes.' },
  avaliacao: { eyebrow: 'Teste antes de confiar', title: 'Qualidade de IA', emphasis: 'precisa ser avaliada.', lead: 'Casos representativos e critérios explícitos tornam a comparação entre versões mais justa e revelam regressões antes de chegar às pessoas usuárias.' },
  incerteza: { eyebrow: 'Fato, hipótese e lacuna', title: 'Uma resposta segura', emphasis: 'mostra seus limites.', lead: 'Quando a evidência não basta, a melhor resposta pode ser indicar a incerteza, citar o que foi encontrado e orientar a próxima verificação.' },
  embeddings: { eyebrow: 'Significado para recuperação', title: 'Embeddings ajudam a', emphasis: 'encontrar contexto.', lead: 'Eles permitem comparar a pergunta a trechos de texto por proximidade de significado, formando uma das etapas de busca usadas em sistemas RAG.' },
  mcp: { eyebrow: 'Capacidades externas sob contrato', title: 'Ferramentas ampliam', emphasis: 'o alcance e o risco.', lead: 'Conectar uma ferramenta permite consultar ou agir em serviços externos. Permissão, aprovação e auditoria continuam sendo responsabilidades da aplicação.' },
  contexto: { eyebrow: 'Informação relevante e delimitada', title: 'Contexto bem escolhido', emphasis: 'vale mais que volume.', lead: 'Instruções, arquivos e resultados de ferramentas devem ser selecionados para a tarefa atual, com origem clara e o menor acesso necessário.' },
  arquitetura: { eyebrow: 'Camadas, confiança e execução', title: 'Uma aplicação com IA', emphasis: 'é mais que um modelo.', lead: 'A experiência completa envolve interface, servidor, identidade, dados, modelo, ferramentas e observabilidade — cada camada com responsabilidades próprias.' },
  frentes: { eyebrow: 'IA ao longo da implementação', title: 'Cada frente exige', emphasis: 'contexto e evidências próprios.', lead: 'Frontend, backend, banco de dados, qualidade e operação podem ganhar velocidade com IA. O que muda entre elas é o contexto necessário, o risco da ação e a forma de comprovar o resultado.' },
  aplicacao: { eyebrow: 'Prática aplicada · integração, estado e memória', title: 'Uma aplicação completa', emphasis: 'pode ser explicada sem chamar uma API.', lead: 'Acompanhe responsabilidades do frontend ao resultado estruturado, incluindo progresso, falhas e memória. Todos os dados são locais, fixos e didáticos.' },
  tecnicas: { eyebrow: 'O problema define a técnica', title: 'Prompt, RAG e ajuste', emphasis: 'resolvem falhas diferentes.', lead: 'Descubra se falta uma instrução melhor, contexto atual ou consistência de comportamento antes de aumentar a complexidade da solução.' },
  aprovacao: { eyebrow: 'Pessoa no circuito', title: 'Automação precisa saber', emphasis: 'quando deve parar.', lead: 'Ações externas, sensíveis ou difíceis de reverter exigem controles proporcionais e uma decisão humana informada.' },
  falhas: { eyebrow: 'Sinais, causas e recuperação', title: 'Falhas de IA devem ser', emphasis: 'investigáveis.', lead: 'Separe problemas de dados, recuperação, contexto, modelo e ferramentas para corrigir a camada certa e prevenir regressões.' },
  observabilidade: { eyebrow: 'Sinais para melhorar com segurança', title: 'O que não é observado', emphasis: 'não pode ser melhorado.', lead: 'Acompanhe o fluxo com sinais de qualidade, falha, duração e uso, respeitando a privacidade das pessoas envolvidas.' },
  governanca: { eyebrow: 'Dados, pessoas e responsabilidade', title: 'IA responsável começa', emphasis: 'antes da chamada ao modelo.', lead: 'Mapeie dados, finalidade, acesso, retenção e responsáveis antes de integrar IA a um produto ou processo.' },
  adequacao: { eyebrow: 'Valor, risco e alternativa', title: 'A melhor solução pode ser', emphasis: 'não usar IA.', lead: 'Compare regras, busca e automação convencional antes de adicionar modelos. Quando IA fizer sentido, modele entradas hostis, impacto e controles.' },
  seguranca: { eyebrow: 'Limites inegociáveis', title: 'Velocidade sem cuidado', emphasis: 'vira risco.', lead: 'Antes de compartilhar contexto ou executar uma sugestão, pare para avaliar o impacto.' },
  'caso-final': { eyebrow: 'Síntese prática do treinamento', title: 'Um caso completo conecta', emphasis: 'decisão, código e operação.', lead: 'Percorra um problema fictício do relato à liberação e escolha os próximos passos com base nas evidências apresentadas ao longo do guia.' },
  bastidores: { eyebrow: 'Bastidores deste projeto', title: 'Este guia foi criado com IA.', emphasis: 'Você dirigiu o processo.', lead: 'Acompanhe pedidos reais, correções de design, laboratórios e decisões de arquitetura que transformaram a apresentação inicial neste guia.' },
  fechamento: { eyebrow: 'Para levar daqui', title: 'Use IA como uma', emphasis: 'dupla de programação.', lead: '' },
} as const

export const openingInsights = [
  { icon: 'layers', title: 'Entenda', text: 'O problema e as regras antes de aceitar uma resposta.' },
  { icon: 'check', title: 'Valide', text: 'Comportamentos, impactos e casos de borda.' },
  { icon: 'shield', title: 'Decida', text: 'A aprovação técnica continua sendo sua.' },
] as const

export const craftSteps = [
  { letter: 'C', title: 'Contexto', description: 'Stack, arquivos, regras e restrições.' },
  { letter: 'R', title: 'Resultado', description: 'O que precisa existir ao final.' },
  { letter: 'A', title: 'Aceitação', description: 'Comportamentos esperados.' },
  { letter: 'F', title: 'Formato', description: 'Como a resposta deve ser entregue.' },
  { letter: 'T', title: 'Travamentos', description: 'Limites, segurança e o que não mudar.' },
] as const

export const models = [
  { title: 'Luna', badge: 'GPT-6 · eficiência', items: ['Edições locais, lint e tipos', 'Triagem e automações frequentes', 'Explicações curtas e escopo claro'], example: 'Ajuste somente os tipos deste arquivo; não altere a lógica.', bestFor: 'Escopo local e alto volume', tradeoff: 'Menos profundidade para ambiguidades', adjustment: 'Aumente o esforço só se o contexto for claro.' },
  { title: 'Terra', badge: 'GPT-5.6 · geração anterior', items: ['Equilíbrio em fluxos cotidianos', 'Compatibilidade com ambientes legados', 'Use se estiver disponível no workspace'], example: 'Resuma este PR legado e destaque dependências afetadas.', bestFor: 'Fluxos existentes que ainda dependem da geração anterior', tradeoff: 'Não é a família mais atual', adjustment: 'Use quando a disponibilidade do ambiente justificar.' },
  { title: 'Sol', badge: 'GPT-6.1 · equilíbrio', items: ['Código com múltiplos arquivos', 'Bugs difíceis e regras de negócio', 'Planos e revisões cuidadosas'], example: 'Mapeie o checkout, liste hipóteses para a duplicação e proponha uma correção.', bestFor: 'Trabalho técnico complexo com custo sob controle', tradeoff: 'Mais lento e caro que Luna', adjustment: 'Comece em médio; aumente para investigação e revisão.' },
  { title: 'Astra', badge: 'GPT-6 · máxima capacidade', items: ['Problemas ambíguos e arquitetura', 'Análise profunda com muito contexto', 'Entregas críticas e exigentes'], example: 'Analise os fluxos de pagamento, riscos de regressão e alternativas de arquitetura.', bestFor: 'Problemas ambíguos e decisões de alto impacto', tradeoff: 'Maior consumo e latência', adjustment: 'Reserve esforço alto para requisitos realmente exigentes.' },
] as const

export const reviewSteps = ['Entender a mudança', 'Verificar se resolve o problema', 'Procurar riscos e efeitos colaterais', 'Confirmar os padrões do projeto', 'Decidir se está pronta']
export const reviewChecklist = ['Regra de negócio', 'Entradas inválidas e casos de borda', 'Segurança e dados sensíveis', 'Acessibilidade', 'Performance', 'Legibilidade', 'Impacto em outros arquivos', 'Compatibilidade com padrões existentes']
export const safetyAlerts = ['Não envie senhas, tokens, chaves de API ou arquivos .env.', 'Não compartilhe dados de clientes ou informações confidenciais em ferramentas não aprovadas.', 'Não execute comandos destrutivos sem entender o impacto.', 'Não assuma que uma API ou biblioteca existe apenas porque a IA sugeriu.']
export const closingPrinciples = ['Dê contexto suficiente.', 'Peça resultados verificáveis.', 'Escolha o modelo de acordo com a complexidade.', 'Mantenha a decisão técnica com a pessoa desenvolvedora.']

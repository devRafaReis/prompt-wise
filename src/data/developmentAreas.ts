export type DevelopmentArea = {
  id: 'frontend' | 'backend' | 'database' | 'quality' | 'operations'
  title: string
  subtitle: string
  usefulFor: readonly string[]
  context: readonly string[]
  evidence: readonly string[]
  risk: string
  prompt: string
}

export const developmentScenario = {
  title: 'Exemplo transversal: status de entrega do pedido',
  description: 'A mesma funcionalidade atravessa interface, API, persistência, testes e operação. A IA pode apoiar cada parte, mas precisa receber contextos e critérios diferentes.',
  acceptance: [
    'A pessoa visualiza o status atual e entende estados de carregamento, vazio e erro.',
    'Somente transições válidas e autorizadas alteram o status.',
    'A mudança de dados é reversível, observável e compatível com registros existentes.',
    'Testes comprovam o contrato entre as camadas e os casos de borda.',
  ],
} as const

export const developmentAreas: readonly DevelopmentArea[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Experiência e estados da interface',
    usefulFor: ['Compor componentes a partir do design system.', 'Mapear estados de carregamento, vazio, sucesso e erro.', 'Sugerir testes de interação, responsividade e acessibilidade.'],
    context: ['Componentes e tokens existentes', 'Contrato real da API', 'Comportamentos e larguras aceitas'],
    evidence: ['Navegação por teclado', 'Inspeção visual em diferentes telas', 'Testes de interação e build'],
    risk: 'Uma tela convincente pode inventar campos, ignorar acessibilidade ou mascarar uma regra que deveria estar no servidor.',
    prompt: 'Implemente a exibição do status de entrega reutilizando os componentes e tokens existentes. Considere carregamento, vazio, sucesso e erro; preserve navegação por teclado e responsividade. Não invente campos: confirme o contrato da API antes de editar. Ao final, execute as validações disponíveis e resuma as evidências.',
  },
  {
    id: 'backend',
    title: 'Backend e APIs',
    subtitle: 'Regras, contratos e autorização',
    usefulFor: ['Localizar o fluxo de uma requisição entre rotas e serviços.', 'Propor validações, tratamento de erros e testes de contrato.', 'Identificar efeitos colaterais, concorrência e idempotência.'],
    context: ['Contrato e regras de negócio', 'Modelo de autenticação e autorização', 'Padrões de erro, logs e transação'],
    evidence: ['Testes unitários e de integração', 'Respostas e códigos previstos no contrato', 'Permissões e logs sem dados indevidos'],
    risk: 'Código que funciona no caminho feliz ainda pode permitir transições inválidas, acesso indevido ou duplicação em novas tentativas.',
    prompt: 'Adicione a atualização do status de entrega no serviço existente. Antes de alterar, localize rota, regra de autorização, transação e padrão de erros. Rejeite transições inválidas, preserve idempotência quando aplicável e crie testes para sucesso, acesso negado, estado inválido e concorrência. Não mude o contrato sem apontar o impacto.',
  },
  {
    id: 'database',
    title: 'Banco de dados',
    subtitle: 'Tabelas, consultas e procedures',
    usefulFor: ['Rascunhar migrações, consultas, índices e procedures.', 'Explicar planos de execução e dependências entre objetos.', 'Gerar dados sintéticos e casos de validação sem copiar produção.'],
    context: ['SGBD e versão exatos', 'Esquema, volume e padrões de migração', 'Restrições, permissões e janela de mudança'],
    evidence: ['Plano de execução com dados representativos', 'Migração direta e reversão ensaiadas', 'Integridade, locks, auditoria e menor privilégio'],
    risk: 'DDL ou uma procedure plausível pode bloquear tabelas, atualizar linhas demais, degradar consultas ou divergir da versão real do SGBD.',
    prompt: 'Analise como incluir o status de entrega no banco existente. Informe primeiro o SGBD, objetos afetados, volume estimado e dependências que ainda precisam ser confirmados. Proponha migração direta e reversão, restrições de integridade, impacto de lock e índice somente se o padrão de consulta justificar. Para a procedure, delimite permissões, transação, linhas afetadas e casos de teste. Não execute em produção.',
  },
  {
    id: 'quality',
    title: 'Qualidade e testes',
    subtitle: 'Critérios transformados em evidência',
    usefulFor: ['Converter requisitos em cenários verificáveis.', 'Encontrar combinações, limites e regressões prováveis.', 'Revisar cobertura sem confundir quantidade com qualidade.'],
    context: ['Critérios de aceitação', 'Histórico de falhas', 'Pirâmide e ferramentas de teste do projeto'],
    evidence: ['Casos falhando antes da correção', 'Casos passando após a mudança', 'Teste no nível mais próximo da regra'],
    risk: 'A IA pode produzir muitos testes frágeis que apenas repetem a implementação e não demonstram a regra de negócio.',
    prompt: 'Derive uma matriz de testes para o status de entrega usando os critérios de aceitação. Separe unidade, integração e interface; inclua transições válidas, inválidas, repetidas, concorrentes e acesso negado. Priorize evidências da regra, evite duplicar testes e indique quais hipóteses dependem de confirmação.',
  },
  {
    id: 'operations',
    title: 'DevOps e operação',
    subtitle: 'Entrega, observação e recuperação',
    usefulFor: ['Revisar pipeline, infraestrutura como código e configuração.', 'Propor rollout gradual, sinais e alertas.', 'Organizar diagnóstico e procedimentos de recuperação.'],
    context: ['Ambientes e processo de implantação', 'Objetivos de serviço e sinais existentes', 'Runbooks, permissões e estratégia de rollback'],
    evidence: ['Validação de configuração e plano de mudança', 'Métricas e alertas ligados ao impacto', 'Rollback testado e responsabilidades claras'],
    risk: 'Sugestões de comandos, permissões ou infraestrutura têm alto impacto; nunca devem ser aplicadas por confiança na fluência da resposta.',
    prompt: 'Prepare um plano de liberação gradual para a mudança de status de entrega. Reutilize o pipeline e os sinais existentes, defina critérios de avanço e interrupção, descreva rollback e não execute comandos. Aponte credenciais, permissões ou mudanças destrutivas que exijam aprovação humana.',
  },
] as const

export const databaseExamples = {
  migration: `-- Ilustração em PostgreSQL; adapte ao esquema e à versão reais.
ALTER TABLE pedidos
  ADD COLUMN status_entrega varchar(20) NOT NULL DEFAULT 'preparando',
  ADD CONSTRAINT pedidos_status_entrega_ck
    CHECK (status_entrega IN ('preparando', 'enviado', 'entregue'));

-- Antes de aplicar: estime lock, duração, compatibilidade e reversão.`,
  procedure: `-- Ilustração didática: autorização continua na aplicação e no banco.
CREATE PROCEDURE atualizar_status_entrega(
  p_pedido_id bigint,
  p_novo_status varchar(20)
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE pedidos
     SET status_entrega = p_novo_status
   WHERE id = p_pedido_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Pedido não encontrado';
  END IF;
END;
$$;

-- Ainda faltam: validar transições, privilégios, auditoria e concorrência.`,
} as const

export const crossLayerChecks = [
  { moment: 'Antes de pedir', question: 'Qual regra pertence a esta camada?', example: 'A interface informa; o backend autoriza; o banco preserva integridade.' },
  { moment: 'Ao dar contexto', question: 'Quais arquivos e fatos são indispensáveis?', example: 'Contrato, padrões locais, esquema, versão e critérios de aceitação.' },
  { moment: 'Antes de aplicar', question: 'Qual dano uma sugestão errada pode causar?', example: 'Regressão visual, quebra de API, perda de dados ou indisponibilidade.' },
  { moment: 'Para aprovar', question: 'Que evidência comprova a mudança?', example: 'Testes, inspeção, plano de execução, migração ensaiada e rollback.' },
] as const

export const developmentQuizScenarios = [
  {
    id: 'transition',
    title: 'Regra inválida',
    situation: 'A interface só oferece “enviado” depois de “preparando”, mas uma requisição manual tenta mudar um pedido já entregue para “enviado”.',
    question: 'Qual proposta cria a proteção mais consistente?',
    options: [
      { id: 'frontend-only', label: 'Corrigir somente a tela', text: 'Manter a regra no seletor, porque é ali que a pessoa escolhe o status.' },
      { id: 'layered-rule', label: 'Validar a regra no backend', text: 'O servidor rejeita a transição; a interface orienta e o banco preserva as restrições de integridade aplicáveis.' },
      { id: 'model-decision', label: 'Pedir ao modelo para decidir', text: 'Enviar o estado atual ao modelo e aceitar a transição que ele considerar adequada.' },
    ],
    correct: 'layered-rule',
    explanation: 'A interface melhora a experiência, mas pode ser contornada. A regra determinística precisa ser aplicada no limite confiável do backend, com integridade complementar no banco.',
  },
  {
    id: 'migration',
    title: 'Tabela grande',
    situation: 'A equipe precisa adicionar uma coluna obrigatória em uma tabela de pedidos com milhões de registros, mas o pedido não informa SGBD, versão ou janela de mudança.',
    question: 'Qual deve ser o primeiro uso da IA?',
    options: [
      { id: 'execute-ddl', label: 'Gerar e executar o DDL', text: 'Usar uma instrução curta e aplicar diretamente, pois adicionar uma coluna é uma alteração simples.' },
      { id: 'inspect-context', label: 'Investigar antes de propor', text: 'Levantar versão, volume, dependências, padrão de migração, lock esperado e estratégia de reversão.' },
      { id: 'add-index', label: 'Criar coluna e índice', text: 'Adicionar um índice preventivamente, mesmo sem conhecer o padrão de consulta.' },
    ],
    correct: 'inspect-context',
    explanation: 'Sem características do ambiente, qualquer DDL é apenas um palpite. A IA ajuda primeiro a estruturar a investigação e só depois a comparar estratégias de migração.',
  },
  {
    id: 'procedure',
    title: 'Procedure gerada',
    situation: 'Uma procedure compilou em desenvolvimento e atualizou corretamente um pedido de teste. Ela altera dados usados por vários serviços.',
    question: 'Qual evidência é necessária antes de tratá-la como pronta?',
    options: [
      { id: 'compile-proof', label: 'A compilação já comprova', text: 'Se o banco aceitou a sintaxe e um caso funcionou, a procedure está pronta para implantação.' },
      { id: 'model-review', label: 'Uma segunda resposta da IA', text: 'Pedir a outro modelo que confirme o código sem consultar o ambiente ou os padrões locais.' },
      { id: 'operational-evidence', label: 'Validar comportamento e operação', text: 'Testar transições, concorrência, linhas afetadas, privilégios, plano, locks, auditoria e reversão.' },
    ],
    correct: 'operational-evidence',
    explanation: 'Compilar confirma apenas parte da sintaxe. Uma mudança de dados precisa demonstrar regra, segurança, comportamento sob carga e caminho de recuperação.',
  },
] as const

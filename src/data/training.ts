import frontendRulesExample from '../../examples/AGENTS.frontend.example.md?raw'
import frontendRulesUrl from '../../examples/AGENTS.frontend.example.md?url'

export { frontendRulesExample, frontendRulesUrl }

export type TopicId = 'inicio' | 'abertura' | 'prompts' | 'modelos' | 'regras' | 'fluxo' | 'revisao' | 'tokens' | 'mapa' | 'rag' | 'embeddings' | 'mcp' | 'contexto' | 'arquitetura' | 'frentes' | 'aplicacao' | 'tecnicas' | 'aprovacao' | 'avaliacao' | 'incerteza' | 'falhas' | 'observabilidade' | 'governanca' | 'adequacao' | 'seguranca' | 'caso-final' | 'bastidores' | 'fechamento'

export type Topic = {
  id: TopicId
  title: string
  eyebrow: string
  description: string
}

export const topics: Topic[] = [
  { id: 'inicio', title: 'Boas-vindas', eyebrow: 'Guia prático', description: 'Visão geral e objetivos da sessão.' },
  { id: 'abertura', title: 'Abertura', eyebrow: '01 · Abertura', description: 'A IA acelera, mas a responsabilidade técnica continua sua.' },
  { id: 'prompts', title: 'Prompts precisos', eyebrow: '02 · Como pedir bem', description: 'Mais contexto útil, menos adivinhação.' },
  { id: 'modelos', title: 'Agentes e versões', eyebrow: '03 · Escolha consciente', description: 'Capacidade, custo, velocidade e contexto orientam a escolha.' },
  { id: 'regras', title: 'Regras em Markdown', eyebrow: '04 · Contexto do projeto', description: 'Instruções locais que orientam o agente no repositório.' },
  { id: 'fluxo', title: 'Do pedido ao PR', eyebrow: '05 · Trabalho com evidências', description: 'Investigue, altere e valide uma mudança com IA.' },
  { id: 'revisao', title: 'Revisão com IA', eyebrow: '06 · Segunda opinião', description: 'IA revisa junto; a aprovação ainda é humana.' },
  { id: 'tokens', title: 'Tokens e contexto', eyebrow: '07 · Demonstração interativa', description: 'Monte uma consulta e compare entrada, geração e uso.' },
  { id: 'mapa', title: 'Mapa das soluções', eyebrow: '08 · O que usar e quando', description: 'Compare modelos, RAG, agentes, workflows e outras abordagens.' },
  { id: 'rag', title: 'RAG na prática', eyebrow: '09 · Busca com evidências', description: 'Recupere fontes relevantes antes de pedir uma resposta ao modelo.' },
  { id: 'embeddings', title: 'Embeddings e busca', eyebrow: '10 · Base do RAG', description: 'Entenda como a busca semântica encontra candidatos relevantes.' },
  { id: 'mcp', title: 'MCP e ferramentas', eyebrow: '11 · Ações com controle', description: 'Conecte capacidades externas mantendo limites e aprovação.' },
  { id: 'contexto', title: 'Engenharia de contexto', eyebrow: '12 · Contexto útil', description: 'Selecione a informação certa para cada tarefa.' },
  { id: 'arquitetura', title: 'Arquitetura com IA', eyebrow: '13 · Do frontend à execução', description: 'Visualize servidores, modelos, recuperação, ferramentas e limites.' },
  { id: 'frentes', title: 'IA nas frentes técnicas', eyebrow: '14 · Da interface ao banco', description: 'Aplique IA em frontend, backend, dados, qualidade e operação.' },
  { id: 'tecnicas', title: 'Prompt, RAG ou ajuste', eyebrow: '15 · Escolha a alavanca', description: 'Diferencie instrução, contexto recuperado e ajuste especializado.' },
  { id: 'aprovacao', title: 'Aprovação humana', eyebrow: '16 · Controle antes da ação', description: 'Decida quando continuar, pausar ou bloquear uma ação.' },
  { id: 'avaliacao', title: 'Avaliação de IA', eyebrow: '17 · Qualidade repetível', description: 'Transforme expectativas em casos e critérios verificáveis.' },
  { id: 'incerteza', title: 'Evidências e incerteza', eyebrow: '18 · Responder com limites', description: 'Diferencie fatos comprovados, hipóteses e lacunas.' },
  { id: 'falhas', title: 'Falhas e recuperação', eyebrow: '19 · Diagnosticar por camada', description: 'Reconheça sinais, encontre a causa e fortaleça os controles.' },
  { id: 'observabilidade', title: 'Observabilidade e custo', eyebrow: '20 · Aprender em produção', description: 'Acompanhe qualidade, falhas, latência e uso com responsabilidade.' },
  { id: 'governanca', title: 'Privacidade e governança', eyebrow: '21 · Dados sob cuidado', description: 'Planeje finalidade, acesso, retenção e responsabilidades.' },
  { id: 'adequacao', title: 'Risco e adequação', eyebrow: '22 · Quando usar, limitar ou evitar', description: 'Compare alternativas simples e modele ameaças antes de automatizar.' },
  { id: 'seguranca', title: 'Segurança responsável', eyebrow: '23 · Limites inegociáveis', description: 'Proteja dados, credenciais e produção.' },
  { id: 'aplicacao', title: 'Integração prática', eyebrow: '24 · Aplicação, estado e memória', description: 'Veja um fluxo completo sem chave, rede ou chamada real.' },
  { id: 'caso-final', title: 'Caso final integrado', eyebrow: '25 · Do problema à liberação', description: 'Conecte arquitetura, implementação, avaliação e operação.' },
  { id: 'bastidores', title: 'Bastidores do projeto', eyebrow: '26 · Como este guia foi criado', description: 'Pedidos reais, iterações e critérios de verificação.' },
  { id: 'fechamento', title: 'Fechamento', eyebrow: '27 · Para levar daqui', description: 'Quatro princípios para usar IA com qualidade.' },
]

export const topicGroups = [
  { id: 'fundamentos', title: 'Fundamentos', topicIds: ['abertura', 'prompts', 'modelos', 'regras', 'fluxo', 'revisao', 'tokens'] },
  { id: 'arquiteturas', title: 'Arquiteturas e ferramentas', topicIds: ['mapa', 'rag', 'embeddings', 'mcp', 'contexto', 'arquitetura', 'frentes', 'tecnicas', 'aprovacao'] },
  { id: 'qualidade', title: 'Qualidade e responsabilidade', topicIds: ['avaliacao', 'incerteza', 'falhas', 'observabilidade', 'governanca', 'adequacao', 'seguranca'] },
  { id: 'pratica', title: 'Prática aplicada', topicIds: ['aplicacao', 'caso-final'] },
  { id: 'encerramento', title: 'Encerramento', topicIds: ['bastidores', 'fechamento'] },
] as const satisfies readonly { id: string; title: string; topicIds: readonly TopicId[] }[]

export const loginPrompt = `Crie um formulário de login em React + TypeScript para o arquivo LoginForm.tsx.\n\nContexto: usamos componentes funcionais, CSS próprio e não há biblioteca de formulários.\nResultado: campos de e-mail e senha, botão Entrar e feedback de sucesso.\nAceitação: valide e-mail obrigatório e válido; senha com mínimo de 8 caracteres; desabilite o botão durante o envio; mensagens acessíveis; navegação por teclado.\nFormato: entregue o componente e uma explicação curta das decisões.\nTravamentos: não instale dependências, não altere outros arquivos e não implemente autenticação real.`

export const reviewPrompt = 'Revise este diff como uma pessoa desenvolvedora sênior. Priorize bugs reais, riscos de segurança, regressões, acessibilidade, performance e aderência aos padrões do projeto. Para cada achado, informe a severidade, o impacto, o trecho afetado e a sugestão de correção. Não reescreva o código antes de explicar os problemas encontrados.'

export const safetyPrompt = 'Antes de sugerir alterações, identifique dados sensíveis, credenciais, operações destrutivas e impactos em produção. Não exponha nem execute ações de risco. Pare e solicite confirmação ao encontrar qualquer situação insegura.'

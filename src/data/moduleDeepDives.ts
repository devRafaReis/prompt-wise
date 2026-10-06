import type { StudyModuleId } from './studyModules'

export type ModuleDeepDive = {
  eyebrow: string
  title: string
  description: string
  scenario: string
  metrics: readonly {
    value: string
    label: string
    detail: string
    tone?: 'positive' | 'attention'
  }[]
  sequence: readonly { title: string; text: string }[]
  table: {
    caption: string
    columns: readonly string[]
    rows: readonly (readonly string[])[]
  }
  takeaway: string
  disclaimer: string
  sources?: readonly { label: string; href: string }[]
}

export const moduleDeepDives: Partial<Record<StudyModuleId, ModuleDeepDive>> = {
  incerteza: {
    eyebrow: 'Caso analisado',
    title: 'Da resposta fluente à resposta verificável',
    description: 'Uma resposta sobre devolução parece simples, mas mistura uma regra confirmada, um dado ausente e uma promessa sem fonte. A análise abaixo separa cada alegação antes de responder.',
    scenario: 'Pergunta fictícia: “Comprei há algumas semanas. Posso devolver e receber o dinheiro em dois dias?”',
    metrics: [
      { value: '1', label: 'fato confirmado', detail: 'A política informa prazo de 30 dias.', tone: 'positive' },
      { value: '1', label: 'lacuna relevante', detail: 'A data exata da compra não foi fornecida.', tone: 'attention' },
      { value: '1', label: 'promessa sem fonte', detail: 'Não há evidência para reembolso em dois dias.', tone: 'attention' },
    ],
    sequence: [
      { title: 'Decompor', text: 'Transforme a pergunta e a resposta proposta em alegações que possam ser verificadas separadamente.' },
      { title: 'Classificar', text: 'Marque cada alegação como confirmada, inferida, contradita ou sem evidência suficiente.' },
      { title: 'Responder', text: 'Use apenas o que foi sustentado, peça o dado ausente e não repita a promessa não comprovada.' },
    ],
    table: {
      caption: 'Matriz de evidências do caso de devolução',
      columns: ['Alegação', 'Evidência disponível', 'Classificação', 'Ação na resposta'],
      rows: [
        ['A política aceita devolução em até 30 dias.', 'Política aprovada, versão 3, seção “Devoluções”.', 'Confirmada pela fonte', 'Informar a regra e citar a fonte.'],
        ['A compra da pessoa está dentro do prazo.', 'A pergunta diz apenas “algumas semanas”.', 'Lacuna de informação', 'Solicitar a data da compra.'],
        ['O dinheiro será devolvido em dois dias.', 'Nenhum trecho recuperado define esse prazo.', 'Não sustentada', 'Não prometer; indicar que o prazo precisa ser confirmado.'],
      ],
    },
    takeaway: 'Citar uma fonte não basta: a fonte precisa sustentar exatamente a alegação apresentada.',
    disclaimer: 'Caso fictício para treinamento. Os prazos não representam a política de uma empresa real.',
  },
  mcp: {
    eyebrow: 'Rastreio de uma chamada',
    title: 'O que acontece entre o pedido e a ferramenta',
    description: 'MCP organiza a comunicação entre aplicações de IA e servidores que expõem prompts, recursos e ferramentas. O protocolo cria contratos; autorização, aprovação e contenção continuam sendo implementadas pela aplicação.',
    scenario: 'Pedido fictício: “Consulte o pedido 412 e, se estiver atrasado, cancele.” Consultar e cancelar são capacidades diferentes e não devem compartilhar a mesma decisão de risco.',
    metrics: [
      { value: '3', label: 'primitivas do servidor', detail: 'Prompts, recursos e ferramentas têm papéis diferentes.' },
      { value: '2', label: 'operações separadas', detail: 'Consultar é leitura; cancelar altera estado.', tone: 'attention' },
      { value: '0', label: 'credenciais no contexto', detail: 'Tokens ficam fora do prompt e do alcance do modelo.', tone: 'positive' },
    ],
    sequence: [
      { title: 'Descobrir', text: 'O cliente lista capacidades e lê seus esquemas; conectar um servidor não autoriza automaticamente cada operação.' },
      { title: 'Propor', text: 'O modelo pode propor `orders.get_status` com o identificador 412. A aplicação valida nome, argumentos, identidade e escopo.' },
      { title: 'Executar', text: 'O servidor consulta o sistema com credenciais protegidas e devolve somente os campos autorizados.' },
      { title: 'Verificar', text: 'A aplicação confere erro, esquema e conteúdo não confiável antes de apresentar o resultado ou planejar outro passo.' },
      { title: 'Aprovar', text: 'Cancelar exige uma nova chamada, justificativa e aprovação humana informada antes da alteração.' },
    ],
    table: {
      caption: 'Matriz ilustrativa de capacidades de um servidor MCP de pedidos',
      columns: ['Capacidade', 'Efeito', 'Entrada mínima', 'Controle determinístico', 'Decisão humana'],
      rows: [
        ['orders.get_status', 'Somente leitura', 'orderId', 'Identidade, vínculo com o pedido e campos permitidos', 'Dispensável se a política autorizar'],
        ['orders.cancel', 'Altera o pedido', 'orderId e motivo', 'Autorização, estado cancelável e idempotência', 'Obrigatória antes de executar'],
        ['customers.export', 'Exporta dados em massa', 'Filtros e finalidade', 'Escopo, volume, destino e auditoria', 'Bloqueada por padrão; liberar só em fluxo aprovado'],
      ],
    },
    takeaway: 'A fronteira segura está no host e no servidor: descrição da ferramenta orienta o modelo, mas controles determinísticos aplicam a política.',
    disclaimer: 'Fluxo ilustrativo. Nenhum servidor MCP é conectado e nenhuma ferramenta é executada nesta página.',
    sources: [
      { label: 'Especificação MCP — prompts, recursos e ferramentas', href: 'https://modelcontextprotocol.io/specification/draft/server' },
      { label: 'SDK oficial MCP — chamada, erro e saída estruturada', href: 'https://ts.sdk.modelcontextprotocol.io/v2/clients/calling' },
    ],
  },
  contexto: {
    eyebrow: 'Comparação prática',
    title: 'Mesmo problema, dois pacotes de contexto',
    description: 'O objetivo não é preencher a janela disponível. É entregar ao modelo a menor coleção de informações que permita decidir corretamente e verificar o resultado.',
    scenario: 'Tarefa fictícia: corrigir um cálculo de frete que diverge entre a tela de checkout e o serviço de preços.',
    metrics: [
      { value: '31 → 4', label: 'artefatos enviados', detail: 'Repositório quase inteiro versus seleção orientada pela tarefa.', tone: 'positive' },
      { value: '~18k → ~4,2k', label: 'tokens estimados', detail: 'Estimativa didática, dependente do modelo e do conteúdo.', tone: 'positive' },
      { value: '4 → 0', label: 'conflitos conhecidos', detail: 'Regras antigas são removidas ou têm precedência definida.', tone: 'positive' },
    ],
    sequence: [
      { title: 'Fixar a intenção', text: 'Registre erro reproduzido, resultado esperado e critérios de aceitação antes de buscar arquivos.' },
      { title: 'Aplicar regras', text: 'Inclua apenas instruções vigentes no escopo e declare precedência quando houver conflito.' },
      { title: 'Buscar evidência', text: 'Selecione contrato de preços, arquivo afetado, teste relacionado e retorno mínimo da ferramenta.' },
      { title: 'Descartar', text: 'Remova builds, logs não relacionados, versões antigas e dados pessoais desnecessários.' },
      { title: 'Atualizar', text: 'Substitua resultados temporários quando o estado mudar; não trate contexto antigo como memória confiável.' },
    ],
    table: {
      caption: 'Comparação entre contexto volumoso e contexto orientado pela tarefa',
      columns: ['Camada', 'Pacote volumoso', 'Pacote focado', 'Critério de inclusão'],
      rows: [
        ['Objetivo', 'Conversa longa com pedidos diferentes', 'Erro reproduzido e aceite atual', 'Afeta diretamente a definição de pronto'],
        ['Regras', 'Documentos antigos e duplicados', '`AGENTS.md` aplicável à pasta', 'Está vigente e no escopo'],
        ['Código', '31 arquivos do projeto', 'Componente, serviço, contrato e teste', 'Participa do fluxo investigado'],
        ['Evidência', 'Log integral de produção', 'Trecho anonimizado do erro e valores de entrada', 'Ajuda a reproduzir sem expor excesso'],
        ['Ferramentas', 'Todos os retornos da sessão', 'Última consulta de preço com origem e horário', 'É atual, necessário e verificável'],
      ],
    },
    takeaway: 'Um bom pacote de contexto explica por que cada item entrou e quando ele deve deixar de ser considerado.',
    disclaimer: 'Quantidades e estimativas são fictícias. Tokens reais variam conforme modelo, tokenizador e conteúdo.',
  },
  observabilidade: {
    eyebrow: 'Snapshot didático',
    title: 'Sinais que ajudam a localizar uma regressão',
    description: 'Uma métrica isolada não explica a causa. O diagnóstico combina versão do fluxo, etapa, qualidade, falhas e mudanças recentes sem registrar conteúdo pessoal além do necessário.',
    scenario: 'Após ampliar a base de documentos, pessoas relatam respostas mais lentas e menos objetivas.',
    metrics: [
      { value: '8,4 s', label: 'latência p95', detail: 'Acima do objetivo fictício de 5 segundos.', tone: 'attention' },
      { value: '12%', label: 'falhas de ferramenta', detail: 'Antes da mudança, o cenário ilustrativo mostrava 3%.', tone: 'attention' },
      { value: '78%', label: 'respostas com fonte válida', detail: 'Sinal de qualidade, não prova de correção.', tone: 'attention' },
    ],
    sequence: [
      { title: 'Detectar', text: 'Compare o sinal com um objetivo definido e confirme se a mudança é consistente, não um evento isolado.' },
      { title: 'Segmentar', text: 'Separe por versão, etapa, ferramenta e tipo de solicitação para reduzir hipóteses concorrentes.' },
      { title: 'Investigar', text: 'Relacione a regressão a mudanças rastreáveis em prompt, recuperação, modelo, fonte ou integração.' },
      { title: 'Corrigir', text: 'Aplique uma alteração por vez, valide em casos fixos e libere gradualmente.' },
    ],
    table: {
      caption: 'Leitura dos sinais do cenário de observabilidade',
      columns: ['Sinal', 'Hipótese inicial', 'Evidência a buscar', 'Resposta segura'],
      rows: [
        ['Latência p95 aumentou', 'Mais contexto ou busca mais lenta', 'Duração por etapa e tamanho do contexto', 'Otimizar a etapa confirmada, não culpar o modelo por suposição'],
        ['Falha de ferramenta aumentou', 'Timeout ou contrato alterado', 'Código do erro, versão e taxa por operação', 'Aplicar retry apenas se a operação for segura e idempotente'],
        ['Fonte válida caiu', 'Recuperação trouxe documentos errados', 'Precisão dos trechos e filtros aplicados', 'Rever índice, metadados e casos de avaliação'],
        ['Feedback negativo subiu', 'Resposta menos útil', 'Amostra revisada e motivo categorizado', 'Não tratar clique isolado como verdade absoluta'],
      ],
    },
    takeaway: 'Observabilidade encurta a investigação quando cada sinal está ligado a uma etapa e a uma versão rastreável.',
    disclaimer: 'Todos os valores são fictícios e servem apenas para exercitar diagnóstico. Não são benchmarks nem dados de produção.',
  },
  governanca: {
    eyebrow: 'Inventário de dados',
    title: 'Antes e depois da minimização',
    description: 'Privacidade começa ao questionar cada campo antes do envio. A finalidade não autoriza coletar tudo: necessidade, acesso, retenção, fornecedor e risco precisam ser avaliados no caso concreto.',
    scenario: 'Caso fictício: resumir um atendimento para que outra pessoa continue o suporte sem reler todo o histórico.',
    metrics: [
      { value: '18 → 6', label: 'campos no contexto', detail: 'O exemplo remove identificadores e dados sem função no resumo.', tone: 'positive' },
      { value: '3', label: 'campos de alto cuidado', detail: 'Diagnóstico de saúde, texto livre e credencial exigem decisões distintas.', tone: 'attention' },
      { value: '1', label: 'finalidade documentada', detail: 'Gerar resumo operacional para continuidade do atendimento.', tone: 'positive' },
    ],
    sequence: [
      { title: 'Mapear', text: 'Liste dado, origem, finalidade, hipótese aplicável, fornecedor, destino, acesso e retenção.' },
      { title: 'Minimizar', text: 'Remova o que não muda o resumo; pseudonimize identificadores e limite texto livre.' },
      { title: 'Avaliar risco', text: 'Considere impacto sobre titulares, volume, dados sensíveis, automação e possibilidade de reidentificação.' },
      { title: 'Proteger', text: 'Aplique acesso mínimo, contrato aprovado, segurança, retenção e descarte verificável.' },
      { title: 'Prestar contas', text: 'Registre a decisão, responsáveis, salvaguardas, revisão e canal para correção ou incidente.' },
    ],
    table: {
      caption: 'Triagem ilustrativa de campos de um histórico de atendimento',
      columns: ['Campo encontrado', 'Classificação no caso', 'É necessário?', 'Tratamento proposto'],
      rows: [
        ['Nome e e-mail', 'Dados pessoais identificadores', 'Não para resumir o problema', 'Remover ou substituir por identificador pseudônimo'],
        ['CPF', 'Dado pessoal identificador', 'Não', 'Remover antes de qualquer envio'],
        ['Número do pedido', 'Dado vinculável à pessoa', 'Sim, para continuidade', 'Pseudonimizar e restringir acesso à relação original'],
        ['Descrição do problema', 'Texto livre; pode conter dados pessoais', 'Sim, de forma reduzida', 'Sanitizar, limitar e revisar o conteúdo necessário'],
        ['Diagnóstico de saúde citado', 'Dado pessoal sensível', 'Não neste caso', 'Bloquear o envio e envolver a área responsável se houver necessidade real'],
        ['Token de acesso colado na conversa', 'Segredo de segurança', 'Nunca', 'Bloquear, revogar a credencial e tratar o incidente'],
      ],
    },
    takeaway: 'Anonimizar, pseudonimizar e remover não são sinônimos. A escolha depende da possibilidade de reidentificação e da finalidade real.',
    disclaimer: 'Caso educacional, não parecer jurídico. Hipótese legal, retenção e controles devem ser definidos pelas áreas responsáveis conforme o contexto.',
    sources: [
      { label: 'Princípios da LGPD — finalidade, necessidade, segurança e prestação de contas', href: 'https://www.gov.br/saude/pt-br/acesso-a-informacao/lgpd/principios' },
      { label: 'ANPD — Relatório de Impacto à Proteção de Dados Pessoais', href: 'https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/relatorio-de-impacto-a-protecao-de-dados-pessoais-ripd' },
      { label: 'ANPD — guia e checklist de segurança da informação', href: 'https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte' },
    ],
  },
}

export type StudyModuleId = 'avaliacao' | 'incerteza' | 'embeddings' | 'mcp' | 'contexto' | 'observabilidade' | 'governanca'

type StudyModule = {
  badge: string
  introduction: string
  steps: readonly { title: string; text: string }[]
  example: { label: string; question: string; outcome: string; check: string }
  doItems: readonly string[]
  avoidItems: readonly string[]
  note: string
  source?: { label: string; href: string }
}

export const studyModules: Record<StudyModuleId, StudyModule> = {
  avaliacao: {
    badge: 'Qualidade repetível',
    introduction: 'Avaliar IA é comparar respostas com critérios definidos antes da demonstração. Um conjunto pequeno de casos realistas torna a melhoria observável e evita decidir só pela impressão de uma conversa.',
    steps: [
      { title: 'Definir casos', text: 'Separe perguntas comuns, exceções, entradas ambíguas e pedidos que devem ser recusados.' },
      { title: 'Fixar critérios', text: 'Descreva o que uma boa resposta precisa conter, como evidência, tom, segurança e formato.' },
      { title: 'Revisar resultados', text: 'Compare versões, registre falhas e transforme os erros recorrentes em novos casos de avaliação.' },
    ],
    example: { label: 'Caso de avaliação', question: '“Posso devolver um item após 45 dias?”', outcome: 'Uma boa resposta não inventa exceções: aponta a política recuperada, reconhece o limite ou solicita o dado que falta.', check: 'Verifique: evidência, ausência de promessa indevida, clareza e encaminhamento útil.' },
    doItems: ['Use exemplos representativos do produto.', 'Combine revisão humana e critérios observáveis.', 'Avalie mudanças de prompt, modelo e recuperação separadamente.'],
    avoidItems: ['Medir qualidade por um único exemplo bonito.', 'Alterar vários componentes do sistema sem registrar o que mudou.', 'Chamar uma simulação de métrica de produção.'],
    note: 'Um conjunto de avaliação não prova que o sistema é perfeito; ele torna os riscos e regressões mais fáceis de encontrar.',
  },
  incerteza: {
    badge: 'Confiabilidade',
    introduction: 'Uma resposta fluente pode estar errada, incompleta ou sem fonte. O objetivo não é eliminar toda incerteza, mas tornar explícito o que foi comprovado, inferido ou ainda precisa ser verificado.',
    steps: [
      { title: 'Separar alegações', text: 'Identifique cada afirmação factual que influencia uma decisão ou orienta uma pessoa usuária.' },
      { title: 'Pedir evidência', text: 'Associe fontes confiáveis às alegações importantes e confira se elas realmente sustentam a resposta.' },
      { title: 'Declarar limites', text: 'Quando a evidência faltar ou entrar em conflito, responda com a limitação em vez de completar lacunas.' },
    ],
    example: { label: 'Checagem de alegação', question: '“Esta biblioteca tem suporte nativo para autenticação?”', outcome: 'Sem documentação ou código que comprove a afirmação, a resposta segura é indicar a incerteza e sugerir onde verificar.', check: 'Verifique: fonte primária, versão analisada e diferença entre fato e hipótese.' },
    doItems: ['Prefira fontes primárias e atuais.', 'Peça citações em respostas baseadas em documentos.', 'Inclua caminhos de verificação para afirmações importantes.'],
    avoidItems: ['Tratar uma citação como prova sem ler a fonte.', 'Ocultar incerteza para parecer mais útil.', 'Usar linguagem definitiva para uma hipótese.'],
    note: 'RAG pode oferecer contexto e citações; ainda assim, uma fonte irrelevante ou desatualizada não torna a resposta correta.',
  },
  embeddings: {
    badge: 'Base técnica do RAG',
    introduction: 'Embeddings representam textos como números para que a aplicação compare proximidade de significado. Eles ajudam a recuperar candidatos relevantes; não são entendimento humano nem garantia de que o trecho responde à pergunta.',
    steps: [
      { title: 'Representar', text: 'Aplique o mesmo processo à pergunta e aos trechos de documentos para poder compará-los.' },
      { title: 'Buscar candidatos', text: 'Recupere poucos trechos semanticamente próximos e filtre por idioma, data, produto e permissão.' },
      { title: 'Conferir relevância', text: 'Reordene e avalie os resultados antes de enviá-los ao modelo como contexto.' },
    ],
    example: { label: 'Busca semântica ilustrativa', question: '“Como obtenho outra via da nota?”', outcome: 'A busca pode aproximar “segunda via da nota fiscal” mesmo sem repetir as mesmas palavras. A seleção final ainda precisa checar o contexto.', check: 'Verifique: documentos corretos, filtros aplicados e se o trecho responde de fato à intenção.' },
    doItems: ['Preserve metadados de origem, versão e permissão.', 'Teste perguntas com sinônimos, abreviações e ambiguidades.', 'Ajuste tamanho e sobreposição dos trechos com casos reais.'],
    avoidItems: ['Exibir uma pontuação como se fosse certeza.', 'Misturar conteúdo de pessoas ou domínios sem filtro de acesso.', 'Enviar todos os resultados só porque foram encontrados.'],
    note: 'A proximidade é apenas um sinal. Para conteúdo crítico, use filtros, revisão e fontes citáveis.',
  },
  mcp: {
    badge: 'Ferramentas com limites',
    introduction: 'MCP permite apresentar ferramentas de um servidor ao modelo sob um contrato. A ferramenta amplia o que o sistema pode consultar ou fazer, então a aplicação continua responsável por permissões, aprovações e registro das ações.',
    steps: [
      { title: 'Declarar capacidade', text: 'Descreva uma ferramenta estreita: nome, finalidade, entradas válidas e limites de uso.' },
      { title: 'Controlar a chamada', text: 'Aplique autenticação, autorização e aprovação humana antes de ações sensíveis ou irreversíveis.' },
      { title: 'Verificar a saída', text: 'Registre o que foi enviado e recebido; trate falhas e resultados inesperados antes de agir novamente.' },
    ],
    example: { label: 'Ferramenta ilustrativa', question: '“Consulte o status do pedido 412.”', outcome: 'O modelo solicita a ferramenta; o servidor valida a identidade e a permissão; só então devolve os campos autorizados para a resposta.', check: 'Verifique: escopo mínimo, aprovação para ações sensíveis e log sem expor dados desnecessários.' },
    doItems: ['Conecte apenas servidores confiáveis e mantenha allowlists.', 'Peça aprovação explícita para ações que alteram dados.', 'Trate conteúdo de ferramentas como dado não confiável.'],
    avoidItems: ['Entregar credenciais ou acesso amplo ao modelo.', 'Executar uma ação destrutiva só porque a chamada foi sugerida.', 'Confiar em instruções escondidas no retorno da ferramenta.'],
    note: 'A interface ilustra o fluxo; ela não se conecta a servidores MCP nem executa ferramentas.',
    source: { label: 'OpenAI Docs — MCP servers', href: 'https://developers.openai.com/api/docs/guides/tools-connectors-mcp' },
  },
  contexto: {
    badge: 'Informação certa, na hora certa',
    introduction: 'Engenharia de contexto é escolher, estruturar e atualizar as informações que chegam ao modelo. Mais texto não é automaticamente mais qualidade: contexto irrelevante aumenta custo, latência e risco de distração.',
    steps: [
      { title: 'Coletar', text: 'Reúna a intenção atual, regras aplicáveis, dados necessários e resultados de ferramentas confiáveis.' },
      { title: 'Priorizar', text: 'Ordene o que é mais relevante e remova duplicações, instruções antigas e dados que não deveriam circular.' },
      { title: 'Compor', text: 'Delimite cada parte do contexto e diga ao modelo qual fonte deve orientar cada decisão.' },
    ],
    example: { label: 'Montagem de contexto', question: '“Corrija o cálculo de frete desta tela.”', outcome: 'O contexto útil inclui o arquivo afetado, o contrato de preços, o erro reproduzido e as regras da pasta — não todo o repositório.', check: 'Verifique: relevância, atualidade, menor privilégio e instruções sem conflito.' },
    doItems: ['Nomeie a origem de regras, arquivos e retornos de ferramentas.', 'Mantenha instruções curtas, específicas e atualizadas.', 'Envie apenas os dados necessários para a tarefa atual.'],
    avoidItems: ['Colar logs enormes sem filtrar.', 'Misturar dados privados com contexto de demonstração.', 'Usar documentação contraditória sem definir precedência.'],
    note: 'Contexto é parte do projeto de software: merece revisão, versionamento e critérios de descarte.',
  },
  observabilidade: {
    badge: 'Qualidade em produção',
    introduction: 'Observabilidade conecta o comportamento da IA ao impacto no produto. Instrumente o fluxo para investigar erros, custo e experiência sem registrar mais conteúdo pessoal do que o necessário.',
    steps: [
      { title: 'Instrumentar', text: 'Registre versões, etapa do fluxo, duração, falhas e sinais de qualidade com identificadores protegidos.' },
      { title: 'Acompanhar', text: 'Observe tendências de latência, uso, erros de ferramenta, recusas e avaliações de pessoas usuárias.' },
      { title: 'Melhorar', text: 'Use os sinais para criar casos de avaliação, corrigir recuperação e liberar mudanças gradualmente.' },
    ],
    example: { label: 'Sinal investigável', question: '“As respostas ficaram mais lentas depois de incluir mais documentos.”', outcome: 'Compare versões do fluxo, quantidade de contexto e duração por etapa antes de atribuir a causa ao modelo.', check: 'Verifique: dados agregados, correlação versus causa e ausência de conteúdo sensível nos logs.' },
    doItems: ['Defina objetivos de qualidade antes de coletar dados.', 'Associe uma mudança a uma versão rastreável.', 'Crie alertas para falhas e custos fora do esperado.'],
    avoidItems: ['Guardar prompts e respostas completos sem política de retenção.', 'Usar um número isolado como diagnóstico final.', 'Otimizar custo sacrificando segurança ou qualidade sem medir o efeito.'],
    note: 'Os indicadores devem ser adaptados ao produto; os exemplos desta seção não são medições reais.',
  },
  governanca: {
    badge: 'Privacidade e governança',
    introduction: 'Sistemas de IA também tratam dados. Antes de integrá-los, mapeie o que circula, por qual motivo, quem pode acessar e por quanto tempo. Em caso de dúvida, envolva as pessoas responsáveis por privacidade e jurídico.',
    steps: [
      { title: 'Mapear o fluxo', text: 'Identifique dados de entrada, provedores, armazenamento, transferências, pessoas com acesso e saídas do sistema.' },
      { title: 'Minimizar e proteger', text: 'Reduza dados ao necessário, aplique controles de acesso e defina retenção, descarte e resposta a incidentes.' },
      { title: 'Prestar contas', text: 'Documente finalidade, decisões, responsáveis e revisões para que o uso possa ser auditado.' },
    ],
    example: { label: 'Decisão de escopo', question: '“Podemos enviar o histórico integral do atendimento para resumir um caso?”', outcome: 'Primeiro avalie finalidade, necessidade, base aplicável, fornecedor e controles. Muitas vezes, um resumo minimizado ou dados anonimizados atendem ao objetivo.', check: 'Verifique: minimização, permissão, retenção e aprovação das áreas responsáveis.' },
    doItems: ['Classifique dados antes de integrá-los a um fluxo de IA.', 'Defina responsáveis por aprovar fontes, acessos e mudanças.', 'Ofereça canais para corrigir e reportar problemas.'],
    avoidItems: ['Enviar dados pessoais por conveniência.', 'Usar conteúdo de produção em demonstrações abertas.', 'Tratar esta seção como aconselhamento jurídico.'],
    note: 'A LGPD traz princípios como finalidade, necessidade, transparência, segurança e responsabilização. A aplicação concreta depende do contexto e deve ser validada pelos responsáveis competentes.',
    source: { label: 'Governo Federal — Princípios da LGPD', href: 'https://www.gov.br/saude/pt-br/acesso-a-informacao/lgpd/principios' },
  },
}

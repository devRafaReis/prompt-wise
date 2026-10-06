# Roteiro completo do treinamento

> Material de apoio do facilitador. Este arquivo não faz parte da navegação do guia e não deve ser importado pelo frontend.

## Visão geral

### Tema

Uso responsável de inteligência artificial no desenvolvimento de software, da elaboração do pedido à validação, passando por agentes, RAG, ferramentas, avaliação, segurança e governança.

### Público sugerido

- Pessoas desenvolvedoras, analistas, líderes técnicos e profissionais de produto.
- Participantes com conhecimento básico de desenvolvimento de software.
- Não é necessário conhecer RAG, embeddings ou MCP previamente.

### Objetivos

Ao final, a turma deverá ser capaz de:

- formular pedidos claros e verificáveis para uma IA;
- escolher entre prompt, RAG, agente, workflow e outras abordagens;
- entender o papel de modelos, contexto, ferramentas e aprovação humana;
- adaptar o uso de IA ao contexto, risco e evidência de cada frente técnica;
- avaliar respostas por evidências, critérios e casos de teste;
- reconhecer riscos de privacidade, segurança e automação;
- usar IA como apoio, mantendo a responsabilidade técnica com pessoas.

### Duração sugerida

- Versão completa: aproximadamente **4h10**, incluindo dois intervalos curtos e perguntas.
- Em duas sessões: aproximadamente **2h05 por encontro**.
- Encontro 1: Boas-vindas até Engenharia de contexto.
- Encontro 2: Arquitetura com IA até Fechamento.

## Preparação do facilitador

Antes da sessão:

- percorra todos os módulos na ordem e teste as interações;
- confirme o layout na resolução usada na apresentação;
- não utilize chaves, credenciais, dados de clientes ou código privado;
- avise que os laboratórios do guia são locais e didáticos;
- destaque que tokens, recuperação e respostas simuladas não são medições de uma API real;
- nos módulos técnicos, use primeiro o bloco “Em palavras simples” como ponte e depois retome a definição completa;
- leia também “Onde a analogia termina” para que a simplificação não seja interpretada como funcionamento literal;
- se mencionar modelos, preços, APIs ou recursos atuais do Codex, confira antes a documentação oficial;
- prepare um exemplo realista, mas anonimizado, da rotina da equipe.

Tenha o guia no navegador, um editor para mostrar o `AGENTS.md`, um cronômetro e um local para registrar dúvidas que exigem investigação posterior.

## Mensagens centrais

Repita estas ideias durante o treinamento:

1. IA acelera tarefas; ela não transfere a responsabilidade técnica.
2. Uma resposta convincente não é necessariamente uma resposta correta.
3. Contexto relevante é melhor do que grande volume de contexto.
4. Toda automação precisa de limites, observabilidade e estratégia de recuperação.
5. Quanto maior o impacto ou a irreversibilidade, maior deve ser o controle humano.
6. Dados privados, segredos e operações destrutivas exigem barreiras explícitas.
7. Nem todo problema precisa de agente ou RAG.
8. Analogias ajudam a começar; decisões técnicas ainda dependem do funcionamento e dos limites reais.

## Agenda sugerida

| Bloco | Conteúdo | Tempo |
| --- | --- | ---: |
| Abertura | Boas-vindas e princípios | 7 min |
| Fundamentos | Prompts, agentes, regras, fluxo, revisão e tokens | 50 min |
| Intervalo | Pausa | 10 min |
| Arquiteturas e ferramentas | Mapa, RAG, embeddings, MCP, contexto, arquitetura, frentes técnicas, técnicas e aprovação | 80 min |
| Intervalo | Pausa | 10 min |
| Qualidade e responsabilidade | Avaliação, evidências, falhas, observabilidade, governança, adequação e segurança | 51 min |
| Prática aplicada | Integração prática e caso final | 18 min |
| Encerramento | Bastidores, síntese e perguntas | 17 min |
| **Total** |  | **aprox. 4h–4h10** |

## Roteiro detalhado

### 00 — Boas-vindas — 3 min

**Objetivo:** estabelecer o contrato da conversa e apresentar a IA como apoio, não como substituta da responsabilidade.

**Fala-guia:**

> Hoje não vamos procurar um botão mágico. Vamos aprender a dar contexto, controlar o que a IA pode fazer e verificar o resultado antes de confiar nele.

**Pontos:** o guia combina conceitos e laboratórios; qualidade depende de pedido, contexto, ferramentas e validação; decisões técnicas continuam pertencendo às pessoas responsáveis pelo sistema.

**Interação:** pergunte onde a turma já utiliza IA: pesquisa, código, testes, documentação, análise ou atendimento.

**Transição:** “Antes de falar de ferramentas, precisamos alinhar a postura com que vamos usá-las.”

### 01 — Abertura — 4 min

**Objetivo:** apresentar o ciclo mental do treinamento.

**Pontos:**

- IA acelera tarefas, mas responsabilidade não é delegada.
- O ciclo é entender o problema, validar o resultado e decidir conscientemente.
- Velocidade sem critérios pode apenas produzir erros mais rápido.

**Pergunta:** “Qual foi a última resposta de IA que pareceu correta, mas exigiu correção depois?”

**Transição:** “O primeiro mecanismo para reduzir ambiguidades é um pedido bem construído.”

### 02 — Prompts precisos — 8 min

**Objetivo:** estruturar solicitações executáveis e verificáveis.

**Pontos:**

- Use CRAFT: Contexto, Resultado, Aceitação, Formato e Travamentos.
- Contexto explica o cenário; resultado descreve a entrega esperada.
- Critérios de aceitação transformam opinião em algo verificável.
- Formato reduz retrabalho; travamentos delimitam o que não pode ser alterado.

**Demonstração:** compare o pedido genérico de login com o exemplo que informa arquivos, comportamento, estados, restrições e validação.

**Atividade:** reescrever “melhore esta tela” usando os cinco elementos do CRAFT.

**Atenção:** um prompt detalhado não compensa contexto incorreto nem ausência de validação.

**Transição:** “Mesmo com um bom pedido, precisamos saber quem o executa: modelo e agente não são a mesma coisa.”

### 03 — Agentes e versões — 8 min

**Objetivo:** diferenciar modelo, agente e autonomia.

**Pontos:**

- O modelo interpreta entradas e produz conteúdo.
- O agente combina modelo, instruções, contexto, ferramentas e ciclo de execução.
- O ciclo típico é observar, planejar, agir, verificar e ajustar.
- Mais capacidade não remove a necessidade de limites.
- Nomes, versões e capacidades mudam; confirme informações atuais em documentação oficial.

**Demonstração:** execute a simulação do agente e narre onde ocorre a chamada de ferramenta, a leitura do resultado e a verificação.

**Pergunta:** “Em qual etapa vocês exigiriam aprovação humana?”

**Transição:** “Para o agente trabalhar de forma consistente, as regras precisam estar onde ele consegue encontrá-las.”

### 04 — Regras em Markdown — 6 min

**Objetivo:** mostrar como instruções persistentes alinham o trabalho ao repositório.

**Pontos:**

- Um `AGENTS.md` registra regras de arquitetura, interface, validação e segurança.
- O escopo do arquivo importa.
- Regras precisam ser específicas, acionáveis e não contraditórias.
- Documentação cria uma base comum, mas não substitui revisão.

**Demonstração:** identifique no exemplo uma regra de organização, uma de interface e uma de validação.

**Conexão com o projeto:** ressalte a regra de reutilizar e seguir os componentes do design system, incluindo estados, foco, responsividade e rolagem.

**Transição:** “Com pedido e regras definidos, podemos acompanhar o trabalho do início ao fim.”

### 05 — Do pedido ao PR — 12 min

**Objetivo:** ensinar um fluxo de execução baseado em evidências.

**Pontos:**

- O fluxo é entender, investigar, alterar e verificar.
- Investigar antes de editar evita soluções baseadas em suposição.
- A alteração deve ser pequena e coerente com a arquitetura.
- Verificação inclui build, testes disponíveis, inspeção visual e revisão do diff.
- Separe o que foi confirmado do que ainda é hipótese.

**Demonstração 1 — pedidos duplicados:** mostrar que desabilitar o botão reduz cliques repetidos, mas não garante idempotência no servidor. Diferenciar mitigação visual de correção sistêmica.

**Demonstração 2 — lista de pedidos:** confirmar contrato da API, reutilizar o design system, prever carregamento, vazio, sucesso e erro, e verificar acessibilidade e responsividade.

**Pergunta:** “Que evidência seria suficiente para aprovar cada mudança?”

**Transição:** “Depois da implementação, ainda precisamos revisar o resultado como engenharia.”

### 06 — Revisão com IA — 6 min

**Objetivo:** ampliar a revisão sem terceirizar o julgamento.

**Pontos:**

- Peça achados concretos, impacto, localização e sugestão.
- Priorize bugs, regressões, segurança e ausência de validação.
- Questione falsos positivos e afirmações sem evidência.
- A saída da IA é insumo, não aprovação automática.

**Demonstração:** apresente o prompt e o checklist de revisão.

**Pergunta:** “O que torna um comentário de revisão acionável?”

**Transição:** “Parte da qualidade depende do que cabe e permanece no contexto.”

### 07 — Tokens e contexto — 10 min

**Objetivo:** explicar como entradas e histórico ocupam a janela de contexto, sem falsa precisão.

**Pontos:**

- Tokens são unidades de processamento e não equivalem exatamente a palavras.
- Instruções, conversa, arquivos, ferramentas e resposta disputam espaço.
- Contexto excessivo aumenta custo, latência e ruído.
- Selecionar arquivos e remover conteúdo irrelevante pode melhorar o resultado.
- Chamadas reais de API e segredos devem permanecer no servidor.

**Demonstração:** use o laboratório visual de fragmentação e composição.

**Aviso obrigatório:** a fragmentação, a estimativa e a resposta são ilustrativas; não são tokens reais nem uma chamada de API.

**Pergunta:** “Que conteúdo costuma entrar no contexto sem ajudar a tarefa?”

**Transição:** “Agora vamos escolher a arquitetura adequada para cada problema.”

### 08 — Mapa das soluções — 12 min

**Objetivo:** diferenciar as principais formas de uso de IA.

**Pontos:**

- Modelo generativo produz ou transforma conteúdo.
- RAG recupera fontes antes de gerar.
- Agente decide próximos passos e usa ferramentas dentro de limites.
- Workflow executa uma sequência definida, com menos autonomia.
- IA preditiva estima classes, riscos ou valores.
- IA multimodal trabalha com diferentes tipos de entrada ou saída.

**Como cada abordagem aparece na prática:**

- Modelo generativo: pode ser acessado em um chat, integrado a uma aplicação por backend ou oferecido dentro do editor. Recebe pedido e contexto e devolve conteúdo.
- RAG: costuma aparecer em busca interna ou chat com documentos. Precisa de fontes preparadas, divisão em trechos, índice de busca e um backend que recupere evidências antes da geração.
- Agente: pode operar no VS Code ou outra IDE, terminal, web, CI ou aplicação própria. Precisa de ferramentas, permissões, ambiente controlado e aprovações proporcionais ao risco.
- Workflow com IA: normalmente roda no backend ou numa plataforma de processos; o caminho é definido pela aplicação e a IA participa apenas de etapas delimitadas.
- IA preditiva: geralmente é consumida como serviço de pontuação ou processamento em lote. Depende de dados históricos, treinamento, validação e monitoramento.
- IA multimodal: aparece em chats e aplicações capazes de receber imagem, áudio, vídeo ou documentos; depende de um modelo compatível e controles para envio da mídia.

**Correção de linguagem:** RAG não exige “treinar um servidor com os documentos”. Os documentos são preparados e indexados; a recuperação seleciona trechos e os acrescenta ao contexto enviado ao modelo. Isso é diferente de treinar ou ajustar os parâmetros do modelo.

**Demonstração:** percorra “Onde aparece”, “Precisa de” e “Fluxo de uso” nos seis cartões. Compare especialmente o agente no editor com o RAG no backend e depois aplique o simulador de decisão a dois cenários.

**Mensagem-chave:** abordagens podem ser combinadas, mas complexidade só deve ser adicionada para resolver uma necessidade concreta.

**Transição:** “Quando a resposta depende de conhecimento atual, privado ou citável, entramos no território de RAG.”

### 09 — RAG na prática — 12 min

**Objetivo:** demonstrar o fluxo de recuperação antes da geração.

**Fluxo:** receber a pergunta, pesquisar a base, recuperar trechos, compor o contexto e gerar uma resposta fundamentada.

**Demonstração:**

- Use a pergunta sobre prazo para devolver um pedido.
- Execute a busca e mostre as fontes selecionadas.
- Explique como o prompt limita a resposta ao material recuperado.
- Compare com uma resposta que inventaria uma política ausente.

**Limitação obrigatória:** o laboratório usa palavras-chave predefinidas. Não é busca vetorial, não utiliza embeddings reais e não chama uma API.

**Perguntas:** “O que fazer quando nenhuma fonte responde?” e “Como o usuário confere a origem da resposta?”

**Resposta esperada:** declarar insuficiência, pedir contexto ou encaminhar; nunca preencher a lacuna com invenção. Exibir fonte e trecho quando possível.

**Transição:** “Para recuperar por significado, e não só por palavras iguais, precisamos entender embeddings.”

### 10 — Embeddings e busca — 8 min

**Objetivo:** explicar representação semântica, divisão de documentos e recuperação.

**Pontos:**

- Embeddings permitem comparar proximidade semântica.
- Documentos são divididos em trechos antes da indexação.
- Trechos pequenos podem perder contexto; grandes podem trazer ruído.
- Sobreposição preserva continuidade, mas aumenta volume e duplicação.
- Filtros por origem, data, permissão ou categoria reduzem resultados inadequados.
- Reranking reorganiza candidatos usando critérios adicionais.

**Demonstração:** altere tamanho e sobreposição no laboratório e compare os trechos.

**Pergunta:** “Que metadado é indispensável para filtrar a base da organização?”

**Transição:** “Além de consultar conhecimento, agentes podem agir em sistemas por meio de ferramentas.”

### 11 — MCP e ferramentas — 8 min

**Objetivo:** explicar ferramentas como contratos controlados.

**Pontos:**

- Ferramentas possuem propósito, entradas, saídas e tratamento de erro.
- MCP padroniza a exposição de contexto e ferramentas a clientes compatíveis.
- Permissão deve ser mínima; leitura e escrita têm riscos diferentes.
- Operações sensíveis precisam de aprovação, validação e registro.
- A saída da ferramenta também pode conter conteúdo não confiável.

**Exemplo:** compare consultar um ticket com alterar seu status e notificar clientes.

**Caso analisado no guia:** percorra o pedido “consulte o pedido 412 e, se estiver atrasado, cancele”. Mostre que `orders.get_status` e `orders.cancel` são operações separadas. Use o rastreio para identificar descoberta, proposta, validação, execução, verificação do retorno e aprovação. Na matriz de capacidades, compare leitura, alteração de estado e exportação em massa.

**Dados para destacar:** MCP organiza prompts, recursos e ferramentas, mas não substitui autenticação, autorização ou aprovação. Credenciais permanecem fora do contexto; esquemas e anotações orientam, enquanto controles determinísticos aplicam a política.

**Pergunta:** “Que ferramenta da equipe deveria começar somente com leitura?”

**Transição:** “Mesmo com boas ferramentas, o agente só decide bem quando recebe o contexto certo.”

### 12 — Engenharia de contexto — 8 min

**Objetivo:** tratar contexto como recurso selecionado e organizado.

**Pontos:** coletar o que afeta a decisão; priorizar regras e evidências ligadas à tarefa; separar objetivo, restrições e fontes; remover informação obsoleta; lembrar que mais contexto não significa mais qualidade.

**Exemplo:** para corrigir um formulário, contrato da API, componente do design system e erro reproduzido são mais úteis do que o repositório inteiro.

**Comparação no guia:** use o cenário do cálculo de frete para comparar 31 artefatos com quatro artefatos selecionados. Explique por que objetivo, regra vigente, contrato, código afetado e evidência reproduzível entram; builds, logs integrais e versões antigas ficam fora.

**Aviso:** as quantidades e estimativas de tokens são fictícias. O aprendizado está no critério de seleção, na origem e na validade de cada item, não nos números absolutos.

**Pergunta:** “Se pudessem fornecer apenas três itens para uma tarefa comum, quais seriam?”

**Transição:** “Agora vamos posicionar cada elemento em uma arquitetura segura.”

### 13 — Arquitetura com IA — 8 min

**Objetivo:** visualizar fronteiras entre interface, servidor, modelo, fontes e ferramentas.

**Pontos:**

- A interface coleta intenção e apresenta estados, fontes e limites.
- O servidor protege segredos, aplica regras, chama provedores e registra operações.
- O modelo não deve receber credenciais ou autoridade desnecessária.
- RAG adiciona ingestão, índice, recuperação e citação.
- Agentes adicionam planejamento, ferramentas, memória controlada e aprovações.
- Fronteiras de confiança devem ser explícitas.

**Demonstração:** percorra chat simples, aplicação com RAG e aplicação com agente.

**Pergunta:** “Onde ficam autenticação, autorização e auditoria em cada fluxo?”

**Transição:** “Com o desenho em mente, vamos observar como o trabalho muda em cada frente técnica.”

### 14 — IA nas frentes técnicas — 12 min

**Objetivo:** mostrar que a IA pode apoiar toda a implementação, mas não recebe o mesmo contexto nem produz a mesma evidência em todas as camadas.

**Exemplo condutor:** acompanhe a inclusão do status de entrega de um pedido. Comece pelos quatro critérios de aceitação exibidos no módulo e ressalte que uma única funcionalidade atravessa interface, contrato, regra, persistência, teste e operação.

**Frontend:** use IA para investigar componentes existentes, compor a interface e mapear carregamento, vazio, sucesso e erro. Forneça design system, contrato real da API, comportamento esperado e larguras aceitas. Para aprovar, verifique teclado, acessibilidade, responsividade, interação e build. Uma tela visualmente boa não comprova a regra de negócio.

**Backend e APIs:** peça primeiro o mapeamento de rota, serviço, autorização, transação e padrão de erro. Depois trate transições válidas, acesso negado, repetição, concorrência e compatibilidade do contrato. Testes unitários e de integração precisam demonstrar a regra; código gerado não recebe confiança especial.

**Banco de dados — tabelas:** apresente a migração ilustrativa. Pergunte qual SGBD e versão estão em uso, quantos registros existem, quais objetos dependem da tabela e como a mudança será revertida. Discuta valor padrão, restrição de integridade, duração, lock e necessidade real de índice. Não execute o exemplo do material em produção.

**Banco de dados — procedures:** mostre que a procedure ilustrativa ainda está incompleta de propósito. A turma deve identificar validação de transição, privilégios, auditoria e concorrência como decisões pendentes. Reforce que autorização pode existir tanto na aplicação quanto no banco, segundo a arquitetura adotada, e que parâmetros não substituem política de acesso.

**Qualidade e testes:** transforme os critérios em uma matriz nos níveis de unidade, integração e interface. Prefira testes ligados à regra e ao histórico de falhas; quantidade de testes gerados não equivale a cobertura útil.

**DevOps e operação:** trate pipeline, configuração, rollout, sinais, critérios de interrupção e rollback. Comandos e mudanças de infraestrutura têm impacto alto: a IA pode preparar e revisar um plano, mas execução e permissões exigem controles explícitos.

**Demonstração:** abra os cinco exemplos de pedido e compare os substantivos usados em cada um: componentes e estados no frontend; contratos e autorização no backend; esquema, locks e privilégios no banco; critérios em qualidade; rollout e recuperação em operação.

**Banco em foco:** leia os dois blocos SQL como rascunhos para revisão. Use o aviso visual para distinguir “sintaxe plausível” de “mudança segura para este ambiente”.

**Verificação prática:** abra somente depois do conteúdo. Percorra os três cenários de múltipla escolha — regra inválida, tabela grande e procedure gerada. Peça uma escolha antes de revelar o feedback e conecte a justificativa ao contexto, ao limite de confiança e à evidência exigida em cada frente.

**Pergunta:** “Que contexto e que prova mudam quando a mesma funcionalidade sai do frontend e chega ao banco?”

**Transição:** “Agora que separamos as responsabilidades, podemos escolher a técnica de IA adequada para cada problema.”

### 15 — Prompt, RAG ou ajuste — 8 min

**Objetivo:** escolher a técnica mais simples que atende ao requisito.

**Pontos:**

- Prompt: instruções, formato e tarefas apoiadas no contexto disponível.
- RAG: conhecimento atual, privado, extenso ou citável.
- Ajuste especializado: comportamento consistente aprendido com exemplos de qualidade.
- Ajuste não é a primeira opção para manter fatos atualizados.
- Dados ruins tornam o erro mais consistente.
- Disponibilidade de ajuste depende do provedor e do modelo.

**Demonstração:** use o comparador e peça justificativas antes de revelar a recomendação.

**Pergunta:** “Que problema seria resolvido por contexto melhor, sem criar um agente?”

**Transição:** “Agora precisamos definir até onde a automação pode avançar sozinha.”

### 16 — Aprovação humana — 8 min

**Objetivo:** relacionar risco e reversibilidade ao controle humano.

**Pontos:**

- Continuar: ação de baixo risco, observável e reversível.
- Pausar: ação com impacto externo, custo, comunicação ou mudança de estado.
- Bloquear: operação proibida, sem autorização ou com dados indevidos.
- A aprovação deve mostrar ação, alvo, impacto e dados envolvidos.

**Demonstração:** classifique documentação, envio de e-mail, deploy e exportação de dados privados.

**Pergunta:** “Que operação seria bloqueada mesmo com alta confiança do modelo?”

**Transição:** “Controle resolve parte do risco. A outra parte é medir qualidade.”

### 17 — Avaliação de IA — 10 min

**Objetivo:** transformar impressões em critérios repetíveis.

**Pontos:**

- Crie casos representativos, difíceis e de limite.
- Defina critérios antes de comparar respostas.
- Avalie correção, fontes, completude, segurança e utilidade.
- Registre regressões quando prompts, modelos ou fontes mudarem.
- Avaliação humana e métricas automáticas podem se complementar.
- Uma resposta pode soar melhor e estar factualmente pior.

**Demonstração:** faça a comparação A/B da política de 30 dias e peça votos antes da análise.

**Perguntas:** “Que critério eliminaria uma resposta?” e “Quais casos devem permanecer fixos em toda versão?”

**Transição:** “Uma boa avaliação separa o que sabemos do que parece provável.”

### 18 — Evidências e incerteza — 7 min

**Objetivo:** comunicar fatos, hipóteses e lacunas honestamente.

**Pontos:** fato tem evidência verificável; hipótese ainda precisa de teste; lacuna é informação necessária indisponível; fontes primárias são preferíveis; limites devem ser declarados.

**Atividade:** divida uma conclusão fictícia em fatos, hipóteses e informações faltantes.

**Caso analisado no guia:** percorra a matriz da devolução. A política de 30 dias está confirmada; a data da compra é uma lacuna; a promessa de reembolso em dois dias não tem fonte. Monte uma resposta que cite a regra, solicite a data e não repita a promessa.

**Transição:** “Essa separação ajuda a encontrar a causa quando algo falha.”

### 19 — Falhas e recuperação — 8 min

**Objetivo:** preparar a equipe para falhas e recuperação controlada.

**Pontos:** recuperação irrelevante, fonte desatualizada, ferramenta indisponível, contexto excessivo, resposta certa pelo motivo errado e instrução maliciosa são falhas distintas.

**Ciclo:** detectar, isolar, reproduzir, corrigir e adicionar um caso de avaliação.

**Pergunta:** “Qual falha permite nova tentativa e qual deve interromper o fluxo?”

**Mensagem-chave:** fallback não esconde o erro; preserva segurança e informa o estado real.

**Transição:** “Para detectar e aprender, precisamos enxergar o comportamento do sistema.”

### 20 — Observabilidade e custo — 7 min

**Objetivo:** mostrar o mínimo para operar uma solução com responsabilidade.

**Pontos:** acompanhe latência, uso, erros e falhas de ferramentas; registre versão do fluxo e avaliação; trate feedback com cuidado; não registre dados pessoais ou segredos sem necessidade; use os sinais para priorizar melhorias e controlar custo.

**Snapshot no guia:** use os valores fictícios de latência p95, falhas de ferramenta e respostas com fonte válida para construir hipóteses. Segmente por etapa e versão antes de atribuir a causa. Ressalte que correlação, feedback e uma métrica isolada não fecham o diagnóstico.

**Pergunta:** “Que sinal mostraria primeiro uma regressão causada por mudança de prompt?”

**Transição:** “Observar não autoriza coletar tudo. Entram privacidade e governança.”

### 21 — Privacidade e governança — 8 min

**Objetivo:** integrar proteção de dados e prestação de contas ao desenvolvimento.

**Pontos:**

- Mapear dados, caminhos e retenção.
- Minimizar o que é enviado e armazenado.
- Proteger acesso, retenção, criptografia e descarte.
- Documentar finalidade, decisões, responsáveis e incidentes.
- Aplicar princípios da LGPD desde o desenho.
- O material é educacional e não substitui avaliação jurídica ou do encarregado de dados.

**Inventário no guia:** analise o resumo de atendimento campo a campo. Nome, e-mail e CPF podem ser removidos; número do pedido pode ser pseudonimizado; texto livre precisa de sanitização; diagnóstico de saúde exige cuidado por ser dado sensível; token de acesso deve ser bloqueado e revogado como incidente de segurança.

**Dados para destacar:** o cenário reduz 18 campos para seis, mas os números são didáticos. A decisão real precisa documentar finalidade, necessidade, hipótese aplicável, acesso, fornecedor, retenção, descarte e responsáveis. Para tratamentos de alto risco, envolva as áreas competentes na avaliação da necessidade de um RIPD.

**Pergunta:** “Que dado poderia ser removido de um prompt sem prejudicar a tarefa?”

**Transição:** “Privacidade cuida dos dados; antes de automatizar, ainda precisamos avaliar necessidade e ameaças.”

### 22 — Risco e adequação — 9 min

**Objetivo:** decidir quando não usar IA e modelar ameaças quando ela for necessária.

**Escada de complexidade:** percorra sem IA, regra determinística, busca tradicional, modelo generativo, RAG e agente. Em cada degrau, mostre o sinal e o exemplo. A equipe deve subir apenas quando a alternativa anterior não atende à necessidade.

**Threat modeling:** para cada ameaça, conecte entrada, impacto e controle. Cubra instrução maliciosa direta, injeção indireta em documentos, exfiltração e ferramenta com privilégio excessivo.

**Critério de adequação:** IA faz sentido quando existe variabilidade relevante e a saída pode ser avaliada, limitada e recuperada. Evite quando o resultado é exato, o dado já está estruturado ou o risco não pode ser controlado.

**Verificação:** use os três cenários de escolha. O status estruturado pede interface convencional; o documento malicioso deve ser tratado como dado; a exclusão exige bloqueio e aprovação.

**Transição:** “A adequação reduz complexidade; segurança aplica limites ao que permanecer.”

### 23 — Segurança responsável — 8 min

**Objetivo:** reconhecer ameaças e aplicar barreiras básicas.

**Pontos:**

- Nunca exponha chaves ou credenciais no frontend, prompt ou exemplo.
- Dados privados devem ser autorizados, minimizados e protegidos.
- Operações destrutivas exigem escopo, confirmação e recuperação quando viável.
- Conteúdo recuperado e saída de ferramentas são dados não confiáveis.
- Prompt injection tenta substituir regras ou obter informação indevida.
- Texto de documentos não pode substituir instruções do sistema e permissões.

**Demonstração:** identifique no laboratório a instrução maliciosa, o ativo protegido e a resposta segura.

**Pergunta:** “Se o conteúdo viesse de uma fonte interna, seria automaticamente confiável?”

**Resposta esperada:** não; origem interna não elimina comprometimento, erro ou instruções indevidas.

**Transição:** “Com os limites definidos, vamos aplicar o fluxo completo sem depender de uma chamada real.”

### 24 — Integração prática — 8 min

**Objetivo:** conectar interface, backend, contexto, estado e resultado estruturado sem chave, provedor ou rede.

**Percurso:** siga as cinco camadas exibidas: a interface coleta e informa; o backend valida identidade e limites; o contexto seleciona fontes e estado útil; uma função local simula a geração; o backend confere o contrato antes de responder.

**Exemplo prático:** leia o handler ilustrativo e os quatro eventos fixos. Destaque que `simulateModelLocally` não representa um SDK ou endpoint real. O valor do exemplo está em mostrar onde entram validação de entrada, seleção de contexto e validação de saída.

**Decisões operacionais:** percorra saída estruturada, progresso, timeout e repetição, rate limit e fallback. Relacione cada decisão do servidor ao estado que a interface apresenta.

**Estado e memória:** diferencie contexto de uma chamada, estado da sessão, memória persistente e dados oficiais do produto. Informação só deve persistir quando houver finalidade, origem, prazo e possibilidade de correção; memória do agente não substitui o sistema de registro.

**Limite obrigatório:** tudo no painel é local e fictício. Não há chave, chamada, conexão, token real ou dependência de ambiente externo.

**Transição:** “Agora vamos reunir arquitetura, segurança e operação em um único caso.”

### 25 — Caso final integrado — 10 min

**Objetivo:** sintetizar o treinamento em um problema fictício sem exigir ferramenta, código ou pesquisa fora do painel.

**Pedido:** clientes veem status antigo após uma atualização. Apresente os quatro fatos disponíveis e resista à conclusão prematura de que a causa está na interface.

**Percurso:** siga problema, investigação, escolha, mudança, qualidade e liberação. Em cada etapa, peça que a turma identifique a evidência exibida antes de avançar.

**Arquitetura resultante:** interface informa; backend autoriza e garante idempotência; banco protege integridade e concorrência; RAG recupera a política; agente auxilia a investigação; pessoa revisa e aprova.

**Decisões de múltipla escolha:** reproduzir e rastrear antes de editar; combinar agente com RAG controlado; completar testes, sinais, rollout e rollback antes de liberar.

**Limite obrigatório:** nada é executado. Endpoints, procedure, logs e resultados são exemplos fictícios e autocontidos.

**Transição:** “O caso resume o método; agora veremos como o próprio guia evoluiu por esse ciclo.”

### 26 — Bastidores do projeto — 5 min

**Objetivo:** conectar o conteúdo às decisões concretas do material.

**Pontos:**

- uso melhor de telas grandes sem rolagem horizontal;
- verificação nos temas claro e escuro;
- limitações explícitas no laboratório de tokens;
- separação entre conteúdo, composição e casca da aplicação;
- exemplo prático de RAG com fontes visíveis;
- design system aplicado a textarea, estados e barra de rolagem;
- navegação agrupada em tópicos e subtópicos;
- laboratórios curtos para tornar decisões observáveis.
- aplicação de IA por frente técnica, com exemplos de frontend, backend, banco, testes e operação.
- aplicação simulada, memória, adequação, threat modeling e caso final sem chamadas externas.

**Escala da colaboração:** mostre o quadro com o agente Codex, a família GPT-5 e a faixa estimada de 250 mil a 415 mil tokens. Explique que o projeto não recebe a telemetria integral da sessão: a faixa parte do volume textual desta versão e amplia a base para representar releituras, diffs, builds, ferramentas e respostas. Não apresente a estimativa como cobrança, medição oficial ou comparação de eficiência.

**Mensagem-chave:** o projeto exemplifica iteração: identificar lacunas, corrigir, validar e converter o aprendizado em regra reutilizável.

**Pergunta:** “Qual melhoria resolveu um defeito local e qual criou proteção para mudanças futuras?”

**Transição:** “Vamos transformar todos os módulos em um conjunto de hábitos.”

### 27 — Fechamento — 5 min

**Objetivo:** consolidar princípios e definir um próximo passo.

**Recapitulação:** dê contexto e critérios; escolha a técnica pela necessidade; proteja integrações e segredos; exija fontes e declare incerteza; avalie continuamente; aplique aprovação conforme o risco; aprenda com falhas.

**Fala de encerramento:**

> Uso responsável de IA não depende de confiar mais na resposta. Depende de um processo em que seja possível entender, limitar, verificar e corrigir o que ela faz.

**Compromisso final:** cada participante escolhe uma prática para a próxima semana: usar CRAFT, adicionar critérios de aceitação, criar casos de avaliação, revisar aprovações humanas ou mapear dados sensíveis enviados à IA.

## Perguntas para a discussão final

1. Em qual problema atual estamos usando complexidade demais?
2. Em qual problema a IA trabalha sem contexto suficiente?
3. Que resposta precisa obrigatoriamente citar fontes?
4. Qual operação nunca deve ocorrer sem aprovação humana?
5. Como saberemos se uma mudança melhorou o sistema?
6. Quem revisa regras, fontes, permissões e casos de avaliação?

## Plano de contingência das demonstrações

Se uma interação falhar:

- explique primeiro a intenção do laboratório;
- use os dados visíveis para percorrer o fluxo verbalmente;
- não improvise chamadas com credenciais ou dados reais;
- registre a falha e retome a apresentação;
- depois aplique o ciclo detectar, isolar, reproduzir, corrigir e avaliar.

## Checklist de encerramento do facilitador

Confirme se a turma compreendeu que:

- modelo e agente são conceitos diferentes;
- RAG recupera conhecimento, mas não garante que a fonte esteja correta ou atual;
- embeddings exigem estratégia de divisão, filtros e avaliação;
- ferramentas ampliam capacidade e também o impacto de erros;
- ações de maior risco exigem aprovação humana;
- laboratórios simulados não são medições reais nem prova de produção;
- qualidade precisa ser avaliada continuamente;
- decisão final e responsabilidade permanecem humanas.

## Glossário rápido

- **Modelo:** sistema que interpreta entradas e produz saídas.
- **Prompt:** instruções e conteúdo enviados ao modelo.
- **Token:** unidade de processamento dependente do modelo.
- **Janela de contexto:** limite de informação considerado em uma interação.
- **Agente:** modelo, regras, contexto e ferramentas em um ciclo de execução.
- **Workflow:** sequência previamente definida de etapas.
- **RAG:** geração apoiada por recuperação de informações externas.
- **Embedding:** representação vetorial usada para comparar significado.
- **Chunk:** trecho de documento preparado para indexação e recuperação.
- **MCP:** padrão para expor contexto e ferramentas a aplicações compatíveis.
- **Avaliação:** medição de respostas com casos e critérios definidos.
- **Prompt injection:** conteúdo que tenta alterar indevidamente o comportamento do sistema.
- **Observabilidade:** entendimento do sistema por meio de sinais e registros.

## Resultado esperado

A turma não precisa dominar cada implementação. Deve sair fazendo perguntas melhores:

- Qual problema estamos resolvendo?
- De que contexto e fontes a resposta depende?
- Qual é a abordagem mais simples que atende ao caso?
- O que o sistema pode fazer sozinho?
- Como a resposta será verificada?
- O que acontece quando algo falha?
- Quais dados, pessoas e sistemas podem ser afetados?

Se essas perguntas estiverem presentes no cotidiano, o treinamento cumpriu seu objetivo.

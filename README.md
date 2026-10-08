# IA na programação

Guia navegável para uso responsável e produtivo de IA na programação.

## Como executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para gerar uma versão de produção:

```bash
npm run build
npm run preview
```

Para percorrer automaticamente os 29 tópicos em larguras de celular e tablet, validar os grupos de navegação, verificar overflow horizontal e acionar os principais laboratórios, execute `npm run audit:responsive`. A auditoria usa uma instalação local do Microsoft Edge ou Google Chrome e não faz chamadas externas.

Use as setas do teclado ou os botões de navegação para avançar pela apresentação.

A navegação lateral funciona como um drawer: pode ser recolhida para liberar a largura do conteúdo e reaberta pelo cabeçalho. A tecla `Esc` também recolhe o menu. Os tópicos permanecem organizados em grupos; o grupo da seção atual é aberto automaticamente e, em telas menores, grupos e tópicos continuam acessíveis em faixas horizontais roláveis enquanto o drawer estiver aberto.

## Estrutura do projeto

| Caminho | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Estrutura geral, navegação, tema e progresso. |
| `src/data/` | Roteiro, textos, prompts e cenários das demonstrações. |
| `src/sections/` | Composição das páginas do guia. |
| `src/components/` | Elementos de interface reutilizáveis e demonstrações interativas. |
| `src/styles.css` | Estilos, temas e responsividade. |
| `api/refinar-prompt.ts` | Vercel Function que consulta a OpenAI sem expor a chave ao navegador. |
| `api/conversar.ts` | Vercel Function para a conversa guiada com histórico limitado à sessão. |
| `AGENTS.md` | Regras ativas deste repositório para o Codex. |
| `ROTEIRO_TREINAMENTO.md` | Roteiro completo de apoio ao facilitador; não é carregado pela aplicação. |

Para adicionar um tópico, atualize o identificador e o roteiro em `src/data/training.ts`, crie a seção em `src/sections/`, registre-a em `src/sections/SectionContent.tsx` e coloque textos/listas editoriais em `src/data/content.ts` ou em um arquivo de dados próprio. Execute `npm run build` para validar.

## Exemplo de regras para frontend

O arquivo [`examples/AGENTS.frontend.example.md`](examples/AGENTS.frontend.example.md) é um modelo didático, também disponível para leitura, cópia e download na seção **Regras em Markdown** da aplicação. Ele cobre organização por feature, design system, UI/UX, acessibilidade, chamadas a endpoints e verificação de mudanças.

O exemplo não é uma regra ativa deste repositório. As regras reais estão em [`AGENTS.md`](AGENTS.md), na raiz. Para usar o exemplo em outro frontend, adapte os caminhos e contratos à estrutura real e copie apenas as regras aplicáveis para um `AGENTS.md` na raiz do projeto ou na pasta correspondente. No Codex, outros arquivos Markdown não são carregados automaticamente como instruções, a menos que sejam referenciados ou configurados como nomes alternativos.

## Demonstração de tokens

Na seção **Tokens e contexto**, digite uma pergunta e acrescente, separadamente, um trecho de regras, histórico, arquivo ou definição de ferramenta. A página mostra de onde vem a entrada estimada, uma prévia da consulta, uma resposta ilustrativa revelada em partes e a ideia de janela de contexto. Os blocos visuais e a estimativa por caracteres **não são tokens reais**; nenhuma consulta é enviada. O exemplo de código na própria seção mostra como um servidor pode consultar a contagem de entrada e ler os campos `usage` de uma chamada real. Nunca coloque uma chave de API no frontend.

## Refinamento de prompts

Em **Prompts precisos**, o laboratório **Revise seu prompt antes de enviar** aceita um rascunho e procura localmente indícios de objetivo, contexto, critérios de sucesso, formato e limites. Para cada lacuna, ele propõe uma pergunta de esclarecimento e disponibiliza um modelo copiável. Ao clicar em **Checar e pedir sugestão**, rascunhos sem indício de segredo ou dado pessoal também são enviados à Vercel Function `api/refinar-prompt.ts`, que consulta `gpt-6-luna` pela Responses API e devolve uma sugestão estruturada. As regras locais não medem qualidade; a resposta do modelo deve ser revisada por uma pessoa.

### Configuração na Vercel

1. Habilite faturamento e crie uma chave de projeto na plataforma da API da OpenAI. A assinatura ChatGPT Plus não inclui o uso da API.
2. Na Vercel, abra **Project Settings → Environment Variables** e crie `OPENAI_API_KEY` como **Secret**, primeiro para **Production**. Não use o prefixo `VITE_` e não coloque a chave no repositório.
3. Faça um novo deploy. A Function será publicada em `/api/refinar-prompt` automaticamente.
4. Antes de abrir o laboratório ao público, em **Firewall**, crie uma regra para o caminho `/api/refinar-prompt`. Comece registrando o tráfego e depois aplique um limite por IP — por exemplo, 10 requisições a cada 10 minutos, com resposta `429`. Isso reduz abuso e custos.
5. Para testar localmente com a Function, instale ou use a CLI da Vercel, execute `vercel env pull` e depois `vercel dev`. O `npm run dev` do Vite serve somente o frontend e não executa Functions.

O arquivo [`.env.example`](.env.example) documenta apenas o nome da variável; ele não contém segredo. Em Preview, prefira uma chave de projeto diferente, com limite de gasto menor, ou não habilite a Function até a revisão.

## Conversa com a IA

O tópico **Pergunte à IA**, em Fundamentos, oferece uma conversa para dúvidas sobre desenvolvimento e uso responsável de IA. O histórico fica apenas na memória da aba atual, e as últimas oito mensagens são enviadas junto da próxima pergunta para preservar o contexto. A conversa é atendida por `api/conversar.ts` quando `OPENAI_API_KEY` está configurada na Vercel. Não envie credenciais, dados pessoais ou conteúdo confidencial; mensagens com indícios desses dados são bloqueadas no navegador antes da chamada.

## RAG na prática

A seção **RAG na prática** explica como uma aplicação pode recuperar trechos de fontes aprovadas e enviá-los como contexto junto da pergunta. O laboratório permite fazer perguntas a uma pequena base local, inspecionar os trechos recuperados e ver o contexto que seguiria ao modelo. A busca usa correspondência de palavras-chave predefinidas: não há embeddings, permissões, chamadas de API ou geração real. O módulo também destaca etapas de preparação, indexação, recuperação, aumento de contexto e geração, além de proveniência das fontes e defesa contra instruções maliciosas em documentos recuperados.

Antes dela, **Mapa das soluções** compara modelos generativos, RAG, agentes, workflows, IA preditiva e capacidades multimodais. A seção deixa explícito que as abordagens podem ser combinadas e mostra um exemplo em que um agente usa RAG para consultar um padrão antes de editar e validar um arquivo.

## Módulos de aprofundamento

Após RAG, o guia inclui os módulos **Avaliação de IA**, **Evidências e incerteza**, **Embeddings e busca**, **MCP e ferramentas**, **Engenharia de contexto**, **Observabilidade e custo** e **Privacidade e governança**. Todos usam cenários didáticos locais, sem acesso a dados, APIs ou ferramentas externas. A exceção é o laboratório de refinamento de prompts quando sua Function tiver sido configurada na Vercel. Os tópicos de MCP e LGPD exibem links para documentação oficial; o material de privacidade é introdutório e não substitui análise jurídica ou das pessoas responsáveis pela governança de dados.

Os módulos sem laboratório interativo possuem casos analisados com indicadores, sequência de decisão e tabelas de evidências. Eles cobrem a separação entre fato e lacuna, o rastreio de uma chamada MCP, a comparação entre contexto volumoso e focado, o diagnóstico de sinais de observabilidade e a minimização de dados em um atendimento. Todos os números apresentados nesses casos são fictícios e servem apenas para discussão didática.

Os assuntos mais técnicos também incluem blocos **Em palavras simples**. Cada bloco aproxima o conceito de uma situação cotidiana e informa onde a analogia deixa de representar o sistema real, preservando a precisão do conteúdo principal.

O **Mapa das soluções** inclui um simulador para escolher entre modelo, RAG, agente, workflow, IA preditiva e capacidade multimodal. **Avaliação de IA** oferece uma comparação A/B orientada por critérios; **Segurança responsável** traz um exercício de prompt injection; e **Arquitetura com IA** permite alternar entre fluxos conceituais de chat, RAG e agente. Todas as interações são locais e ilustrativas.

O aprofundamento inclui ainda um laboratório de **chunking** em Embeddings, o módulo **Aprovação humana** para decidir entre continuar, pausar ou bloquear ações, **Falhas e recuperação** com diagnóstico por camada e **Prompt, RAG ou ajuste**, que diferencia problemas de instrução, contexto e consistência de comportamento. Os exemplos não executam modelos, ferramentas ou treinamentos reais.

Na seção **Agentes e versões**, os exercícios expansíveis mostram o ciclo pedido → chamada de ferramenta → resultado → decisão humana e um caso de instrução maliciosa escondida em um log. Eles são simulações locais: não executam ferramentas, não editam arquivos nem acessam dados sensíveis.

## Casos de desenvolvimento com IA

A seção **Do pedido ao PR** percorre dois casos guiados: um checkout que duplica pedidos e uma lista de pedidos ligada à API. Em cada etapa, mostra um pedido copiável para o agente, as evidências a conferir e um sinal de atenção. Os textos desses casos ficam em `src/data/workflow.ts`.

O grupo **Prática aplicada** reúne **Integração prática** e **Caso final integrado**; junto de **Risco e adequação**, esses módulos fecham as principais lacunas práticas sem depender de serviços externos. Eles mostram integração, saída estruturada, progresso, fallback, estado, memória, escolha da solução mais simples, threat modeling e liberação. Esses exemplos continuam locais ou fictícios. O projeto não contém chave; a única chamada real opcional é o refinamento de prompts, executado pela Vercel Function depois que `OPENAI_API_KEY` for configurada.

## Bastidores deste projeto

Antes do fechamento, a seção **Bastidores do projeto** apresenta treze iterações reais desta conversa, incluindo layout, tokens, RAG, design system, navegação agrupada, frentes técnicas, uso das soluções, drawer, prática autocontida e analogias com limites. Cada caso separa o pedido humano, a mudança feita com IA, o que conferir e o aprendizado. A seção também identifica o agente e a família do modelo e apresenta uma faixa estimada de tokens com sua metodologia; ela não substitui telemetria real da plataforma. Os textos ficam em `src/data/projectStory.ts`. São resumos didáticos, não transcrições completas nem um histórico de commits.

# Regras deste projeto

Este repositório é um guia didático em React + TypeScript + Vite sobre uso responsável de IA no desenvolvimento. Mantenha os exemplos compreensíveis, precisos e em português do Brasil.

## Organização

- `src/App.tsx`: somente casca da aplicação, estado de navegação, tema e progresso. Não coloque conteúdo de aulas aqui.
- `src/data/`: textos, listas, prompts, cenários e dados das demonstrações. Adicione conteúdo novo aqui antes de criar JSX extenso.
- `src/sections/`: composição visual de cada seção do guia. Registre seções novas em `SectionContent.tsx` e em `src/data/training.ts`.
- `src/components/`: componentes de interface e interações reutilizáveis. Reutilize os existentes antes de criar variantes.
- `src/styles.css`: estilos e tokens visuais atuais. Preserve temas claro/escuro e comportamento responsivo.
- `examples/AGENTS.frontend.example.md`: exemplo didático exibido no guia; não descreve a arquitetura real deste repositório.

## Interface e conteúdo

- Todo componente ou controle novo deve seguir rigorosamente o design system existente: reutilize componentes de `src/components/`, tokens de `src/styles.css`, espaçamentos, estados interativos e padrões de foco antes de criar uma variação. Não deixe controles nativos sem estilização consistente com o projeto.
- Mantenha navegação por teclado, foco visível, rótulos acessíveis e HTML semântico.
- Use a largura disponível em telas grandes sem introduzir rolagem horizontal; em telas pequenas, permita rolagem vertical quando o conteúdo exigir.
- Não apresente simulações como medições reais. No laboratório de tokens, deixe explícito que fragmentação, estimativas e respostas são ilustrativas; chamadas reais de API devem ocorrer no servidor.
- Ao explicar modelos, APIs ou comportamento do Codex que podem mudar, confira a documentação oficial antes de alterar afirmações factuais.
- Preserve os exemplos copiáveis e as fontes exibidas na interface.
- Em módulos didáticos, apresente conceitos, exemplos e critérios antes de perguntas, simuladores ou exercícios de verificação. Coloque a interação avaliativa ao final do conteúdo correspondente; só antecipe uma pergunta quando ela for deliberadamente um diagnóstico inicial e estiver identificada como pré-teste.

## Mudanças e validação

- Faça alterações pequenas e coerentes com a estrutura existente; não adicione dependências sem necessidade demonstrável.
- Não inclua segredos, chaves de API nem dados privados no frontend ou nos exemplos.
- Atualize o README quando a organização ou o modo de uso mudar.
- Após qualquer inclusão de conteúdo, funcionalidade ou correção, recalcule a base textual e atualize `projectCreationEstimate` em `src/data/projectStory.ts`. Preserve a estimativa como faixa de ordem de grandeza, explique a metodologia e nunca a apresente como telemetria real. Mantenha também a identificação do agente e da família do modelo coerente com as informações efetivamente disponíveis.
- Execute `npm run build` após mudanças de código e relate falhas. Não crie uma suíte de testes apenas para esta apresentação, salvo solicitação explícita.

# Regras do frontend — exemplo para adaptar

> Este arquivo é um modelo didático para um projeto React + TypeScript. Antes de usá-lo,
> adapte nomes de pastas, contratos de API, comandos e tokens ao repositório real.
> Copie as regras aplicáveis para `AGENTS.md` na raiz do frontend quando quiser ativá-las.

## Alcance e fontes de verdade

- Aplique estas regras a mudanças no frontend. Preserve convenções existentes quando forem diferentes deste exemplo e explique a divergência.
- Antes de criar componentes ou chamadas de rede, consulte os componentes, tokens e clientes HTTP já usados na área afetada.
- Use o contrato da API (OpenAPI, tipos gerados ou implementação existente) como fonte de verdade. Não invente campos, rotas ou códigos de resposta.
- Consulte documentação de arquitetura apenas quando a tarefa alterar limites entre módulos; não leia todos os documentos em toda edição.

## Organização dos arquivos

```text
src/
  app/                     # inicialização, rotas e providers
  pages/                   # composição de páginas; pouca lógica de domínio
  features/
    pedidos/
      api/                 # funções de acesso aos endpoints da feature
      components/          # componentes específicos de pedidos
      hooks/               # estado e efeitos reutilizáveis da feature
      types/               # tipos do domínio e contratos locais
  shared/
    api/                   # cliente HTTP e tratamento comum de erros
    ui/                    # componentes genéricos do design system
    styles/                # tokens, estilos globais e utilitários CSS
  assets/                  # imagens e ícones locais
```

- Coloque uma página em `pages/` e componha nela os elementos de `features/` e `shared/ui/`.
- Coloque regras de negócio e componentes de uma funcionalidade em `features/<nome>/`.
- Promova um componente para `shared/ui/` apenas quando ele for realmente genérico e reutilizado; não leve regras de negócio para lá.
- Coloque tipos próximos da feature que os usa. Evite um arquivo global de tipos sem domínio claro.
- Se o projeto já usar outra organização, siga o padrão existente e proponha migração separadamente.

## UI, UX e acessibilidade

- Reutilize componentes e tokens existentes antes de criar variantes. Defina cores, fontes, espaçamentos, raios e sombras em `shared/styles/tokens.css`; não espalhe valores repetidos em componentes.
- Use layout responsivo: verifique largura pequena, notebook e desktop. Não permita rolagem horizontal causada por cards, tabelas ou texto longo.
- Use elementos HTML semânticos. Botões executam ações; links navegam. Campos têm rótulos visíveis e erros associados.
- Mantenha contraste legível, foco de teclado visível e ordem de navegação coerente. Não dependa só da cor para transmitir estado.
- Toda tela que busca dados deve mostrar carregamento, vazio, erro recuperável e sucesso. Preserve o conteúdo anterior durante atualizações quando isso ajudar a orientação da pessoa usuária.
- Antes de criar uma nova interação, descreva o estado inicial e o que acontece ao clicar, carregar, falhar e tentar novamente.

## Chamadas a endpoints

- Confirme método, caminho, parâmetros, autenticação, formato da resposta e erros no contrato existente antes de implementar.
- Centralize base URL, cabeçalhos comuns e conversão de erros em `shared/api/`. Use `VITE_API_BASE_URL` apenas para endereço público; variáveis `VITE_` aparecem no código do navegador e não podem conter segredos.
- Crie funções específicas em `features/<nome>/api/`, por exemplo `listarPedidos({ signal })`; componentes não devem montar URLs ou chamar `fetch` diretamente.
- Em requisições, trate `response.ok`, falhas de rede e cancelamento com `AbortController` quando o ciclo de vida da tela exigir.
- Valide dados externos na fronteira quando o projeto já tiver estratégia de validação. Não confunda o tipo TypeScript com garantia de dados válidos em tempo de execução.
- Não registre tokens, respostas sensíveis ou dados pessoais no console. Respeite o mecanismo de autenticação existente; não o substitua por uma solução improvisada.
- Para ações de escrita, evite envio duplicado, mostre estado pendente e dê retorno de sucesso ou erro. Não use retry automático em operações não idempotentes sem contrato para isso.

## Padrões de implementação

- Prefira componentes pequenos com props explícitas e estado local quando possível. Extraia hooks para lógica reutilizável, não apenas para mover linhas de lugar.
- Mantenha transformação de dados e regras de negócio fora de componentes visuais genéricos.
- Em mudanças de API, atualize primeiro os tipos e o módulo `api/`, depois o hook/estado e por fim a interface. Revise os consumidores afetados.
- Evite novas dependências para tarefas que a stack existente já cobre. Se uma biblioteca for necessária, justifique o ganho e o impacto no bundle.

## Exemplo de entrega: lista de pedidos

- `src/features/pedidos/types/pedido.ts`: tipos alinhados ao contrato real.
- `src/features/pedidos/api/listarPedidos.ts`: chamada GET e tratamento de resposta.
- `src/features/pedidos/hooks/usePedidos.ts`: carregamento, erro, cancelamento e atualização.
- `src/features/pedidos/components/PedidoList.tsx`: lista, estados vazio/erro e ações acessíveis.
- `src/pages/PedidosPage.tsx`: composição da página sem detalhes HTTP.
- `src/shared/ui/`: use componentes existentes de botão, aviso e carregamento; só acrescente novos se forem reutilizáveis.

## Verificação antes de entregar

- Rode os comandos de build e checagem existentes para os arquivos afetados.
- Confira teclado, foco, rótulos e os quatro estados de dados: carregando, vazio, erro e sucesso.
- Verifique a tela em larguras pequenas e grandes e confirme ausência de rolagem horizontal.
- Resuma os arquivos alterados, o contrato de API usado e qualquer hipótese que ainda precise ser confirmada.

export type WorkflowPhase = {
  title: string
  purpose: string
  prompt: string
  evidence: string[]
  warning: string
}

export type WorkflowScenario = {
  id: string
  title: string
  subtitle: string
  observed: string
  desired: string
  phases: WorkflowPhase[]
}

export const workflowScenarios: WorkflowScenario[] = [
  {
    id: 'checkout',
    title: 'Checkout duplica pedidos',
    subtitle: 'Investigação de bug · React + API',
    observed: 'Dois cliques rápidos em “Finalizar” parecem criar dois pedidos.',
    desired: 'Uma intenção de compra deve produzir um pedido, com retorno claro na interface.',
    phases: [
      {
        title: 'Entender',
        purpose: 'Mapear o caminho antes de editar.',
        prompt: 'Mapeie o fluxo do botão Finalizar até a chamada de criação do pedido. Localize handler, estado de carregamento e cliente HTTP. Descreva o que acontece em dois cliques rápidos. Não altere arquivos ainda.',
        evidence: ['Arquivos e funções que participam do fluxo.', 'Registro da aba Network: quantos POSTs saem em dois cliques?', 'Passos claros para reproduzir o problema.'],
        warning: 'Não conclua que o botão é a causa sem observar a requisição e o servidor.',
      },
      {
        title: 'Investigar',
        purpose: 'Comparar hipóteses com observações.',
        prompt: 'Com base no fluxo e no registro de rede, liste hipóteses para a duplicação: cliques repetidos, retry do cliente ou processamento no servidor. Para cada hipótese, diga qual evidência a confirma ou descarta.',
        evidence: ['Diferença entre dois POSTs e um POST com dois registros.', 'Comportamento do cliente quando a resposta demora ou falha.', 'Contrato do endpoint e estratégia de idempotência existente.'],
        warning: 'Desabilitar o botão pode melhorar a UX, mas sozinho não garante idempotência no servidor.',
      },
      {
        title: 'Alterar',
        purpose: 'Aplicar a menor correção compatível com a causa.',
        prompt: 'Depois de confirmar a causa, proponha uma alteração pequena. Preserve o contrato da API e os componentes existentes. Explique quais arquivos serão alterados e o que precisa ser tratado no frontend ou no servidor.',
        evidence: ['Diff limitado aos pontos afetados.', 'Estado pendente e feedback de erro/sucesso coerentes.', 'Alinhamento com o contrato de idempotência, quando aplicável.'],
        warning: 'Uma API ou propriedade sugerida pela IA precisa existir no projeto ou na documentação real.',
      },
      {
        title: 'Verificar',
        purpose: 'Decidir com base no comportamento observado.',
        prompt: 'Revise o diff e informe o que foi verificado. Considere dois cliques rápidos, conexão lenta, falha da API, teclado e impacto em outros fluxos de compra. Separe fatos observados de riscos ainda abertos.',
        evidence: ['No cenário reproduzido, a quantidade de requisições e pedidos é a esperada.', 'A interface se recupera de falha e permite nova tentativa segura.', 'Build e verificações já existentes passam.'],
        warning: 'Se a duplicação persistir no servidor, o trabalho não termina com uma mudança visual.',
      },
    ],
  },
  {
    id: 'lista',
    title: 'Lista de pedidos com API',
    subtitle: 'Nova funcionalidade · UI + contrato',
    observed: 'O time quer mostrar os pedidos recentes na área do cliente.',
    desired: 'A página deve apresentar dados reais e estados de carregamento, vazio e erro.',
    phases: [
      {
        title: 'Entender',
        purpose: 'Localizar padrões de tela e contrato.',
        prompt: 'Encontre no projeto o padrão de páginas, componentes de lista e cliente HTTP. Localize o contrato existente para consultar pedidos. Informe rota, parâmetros, formato de resposta e estados que a tela precisa cobrir. Não implemente ainda.',
        evidence: ['Componentes e tokens do design system disponíveis.', 'Endpoint documentado ou implementação existente.', 'Regras de autorização e paginação, se houver.'],
        warning: 'Um exemplo inventado de JSON não substitui o contrato da API.',
      },
      {
        title: 'Planejar',
        purpose: 'Definir arquivos e comportamento.',
        prompt: 'Proponha uma implementação em etapas pequenas para a lista de pedidos. Separe página, feature, módulo de API e componentes compartilhados. Descreva os estados de carregamento, vazio, erro e sucesso.',
        evidence: ['Caminhos de arquivos compatíveis com o repositório.', 'Responsabilidade clara para página, feature e cliente HTTP.', 'Critérios observáveis para cada estado da tela.'],
        warning: 'Não crie um segundo design system ou cliente HTTP se o projeto já tiver um.',
      },
      {
        title: 'Alterar',
        purpose: 'Implementar uma fatia utilizável.',
        prompt: 'Implemente a consulta de pedidos conforme o contrato confirmado e conecte-a à página. Reutilize componentes e tokens existentes. Trate carregamento, lista vazia, falha recuperável e cancelamento da requisição quando necessário.',
        evidence: ['Tipos alinhados à resposta real.', 'Componente não monta URLs nem guarda segredo no navegador.', 'Mensagens e ações acessíveis em todos os estados.'],
        warning: 'TypeScript descreve a forma esperada, mas não valida sozinho os dados recebidos em tempo de execução.',
      },
      {
        title: 'Verificar',
        purpose: 'Conferir interface, rede e regressões.',
        prompt: 'Revise a alteração em relação ao contrato e aos padrões do projeto. Relate o comportamento observado com dados, lista vazia e erro de rede. Indique o que ainda depende de confirmação do backend ou do produto.',
        evidence: ['A aba Network mostra a rota e parâmetros esperados.', 'Layout legível em notebook e celular; teclado e foco funcionam.', 'Build e verificações já existentes passam.'],
        warning: 'Se a tela funciona apenas com dados simulados, a integração ainda não foi comprovada.',
      },
    ],
  },
]

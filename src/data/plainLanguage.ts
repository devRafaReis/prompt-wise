import type { TopicId } from './training'

export type PlainLanguageExplanation = {
  title: string
  analogy: string
  limit: string
}

export const plainLanguage: Partial<Record<TopicId, PlainLanguageExplanation>> = {
  mapa: {
    title: 'Pense em uma caixa de ferramentas',
    analogy: 'Modelo, RAG, agente e workflow não são marcas concorrentes. São peças com funções diferentes: uma redige, outra consulta referências, outra decide etapas e outra segue uma sequência pronta.',
    limit: 'Na prática, uma mesma aplicação pode combinar várias peças e ainda precisar de código convencional.',
  },
  rag: {
    title: 'É como responder com um livro aberto',
    analogy: 'Antes de responder, alguém procura as páginas mais relacionadas à pergunta, coloca essas páginas sobre a mesa e pede que a resposta use aquele material.',
    limit: 'Encontrar uma página não prova que ela está correta, atualizada ou autorizada para aquela pessoa.',
  },
  embeddings: {
    title: 'É como organizar assuntos em um mapa',
    analogy: 'Textos com sentidos parecidos tendem a ficar em regiões próximas. Assim, “segunda via da nota” pode ficar perto de “obter outra cópia da nota fiscal”, mesmo usando palavras diferentes.',
    limit: 'Proximidade indica semelhança, não verdade, qualidade nem certeza de que o trecho responde à pergunta.',
  },
  mcp: {
    title: 'É como uma tomada com encaixe conhecido',
    analogy: 'O padrão diz como apresentar ferramentas e trocar mensagens. Isso evita inventar uma conexão diferente para cada ferramenta que o agente pode consultar.',
    limit: 'Ter o encaixe certo não concede permissão: identidade, acesso, aprovação e auditoria continuam necessários.',
  },
  contexto: {
    title: 'Contexto é a mesa de trabalho',
    analogy: 'Coloque sobre a mesa apenas o pedido, as regras, o arquivo e a evidência necessários para a tarefa atual. Uma mesa vazia obriga a adivinhar; uma mesa lotada esconde o que importa.',
    limit: 'Selecionar bem não corrige uma fonte errada nem autoriza o uso de dados que deveriam permanecer privados.',
  },
  arquitetura: {
    title: 'Pense em um prédio com áreas de acesso',
    analogy: 'A interface é a recepção, o backend confere identidade e regras, o modelo presta um serviço e bancos ou ferramentas ficam em áreas com acesso controlado.',
    limit: 'O desenho real pode ter muitas outras camadas; a analogia serve para lembrar que nem toda parte deve acessar tudo.',
  },
  tecnicas: {
    title: 'Instrução, consulta ou prática?',
    analogy: 'Prompt é explicar melhor a tarefa; RAG é abrir o manual certo durante a tarefa; ajuste especializado é praticar muitos exemplos para tornar um comportamento mais consistente.',
    limit: 'As técnicas podem ser combinadas, mas nenhuma compensa dados ruins, critérios vagos ou ausência de avaliação.',
  },
  avaliacao: {
    title: 'É como criar o gabarito antes da correção',
    analogy: 'Primeiro se define o que conta como resposta boa, segura e completa. Depois se comparam as respostas usando os mesmos casos e critérios.',
    limit: 'Um gabarito pequeno ajuda a encontrar regressões, mas não representa todas as pessoas e situações do mundo real.',
  },
  incerteza: {
    title: 'Use três etiquetas mentais',
    analogy: '“Confirmado” tem evidência; “provável” ainda é hipótese; “faltando” precisa de outra informação. Uma resposta responsável não mistura as três etiquetas.',
    limit: 'Declarar incerteza melhora a decisão, mas não elimina a necessidade de investigar afirmações importantes.',
  },
  observabilidade: {
    title: 'É o painel do carro, não o mecânico',
    analogy: 'Latência, erros, custos e avaliações acendem sinais de que algo mudou. Eles ajudam a localizar onde investigar antes que o problema cresça.',
    limit: 'Um indicador mostra um sintoma; sozinho, não demonstra a causa nem autoriza registrar conteúdo privado.',
  },
  governanca: {
    title: 'É como controlar o empréstimo de uma pasta',
    analogy: 'Antes de entregar dados, registre por que são necessários, quem pode vê-los, por quanto tempo ficarão disponíveis e como serão devolvidos ou apagados.',
    limit: 'A analogia ajuda a lembrar responsabilidades, mas decisões legais dependem do caso e das áreas competentes.',
  },
  aplicacao: {
    title: 'É como acompanhar uma encomenda por etapas',
    analogy: 'A interface recebe o pedido, o backend confere os dados, o contexto separa o material necessário, a etapa simulada produz um resultado e o backend verifica antes de entregar.',
    limit: 'O exemplo mostra responsabilidades, não uma infraestrutura pronta nem o comportamento de um provedor real.',
  },
  adequacao: {
    title: 'Nem todo parafuso precisa de uma furadeira',
    analogy: 'Se uma regra ou busca simples resolve o problema, adicionar IA traz mais peças para operar sem aumentar o valor. Suba a complexidade apenas quando houver uma necessidade concreta.',
    limit: 'A alternativa mais simples ainda precisa atender qualidade, segurança, escala e experiência do produto.',
  },
}

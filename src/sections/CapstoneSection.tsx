import ChoiceScenarioLab from '../components/ChoiceScenarioLab'
import { Icon } from '../components/GuideUI'
import SectionHeading from '../components/SectionHeading'
import { capstoneBrief, capstoneChoiceScenarios, capstoneStages } from '../data/advancedPractice'

export default function CapstoneSection() {
  return <section className="capstone-section">
    <SectionHeading id="caso-final" />
    <article className="capstone-brief"><header><div><p className="eyebrow">Caso integrado</p><h2>{capstoneBrief.title}</h2></div><span>Exemplo fictício</span></header><blockquote>{capstoneBrief.request}</blockquote><div>{capstoneBrief.facts.map(fact => <p key={fact}><Icon name="check" size={16} />{fact}</p>)}</div></article>

    <ol className="capstone-stages" aria-label="Etapas do caso final">{capstoneStages.map((stage, index) => <li key={stage.title}><header><b>{String(index + 1).padStart(2, '0')}</b><span>{stage.owner}</span></header><h2>{stage.title}</h2><p>{stage.action}</p><footer><small>EVIDÊNCIA</small><strong>{stage.evidence}</strong></footer></li>)}</ol>

    <article className="capstone-architecture"><header><p className="eyebrow">Solução resultante</p><h2>Cada componente faz somente o seu trabalho</h2></header><div><p><strong>Interface</strong><span>Mostra estado e impede repetição acidental.</span></p><p><strong>Backend</strong><span>Autoriza, valida a transição e garante idempotência.</span></p><p><strong>Banco</strong><span>Preserva integridade, transação e concorrência.</span></p><p><strong>RAG</strong><span>Recupera a política vigente com origem.</span></p><p><strong>Agente</strong><span>Investiga e altera o projeto usando ferramentas limitadas.</span></p><p><strong>Pessoa</strong><span>Revisa evidências e aprova mudança e liberação.</span></p></div></article>

    <div className="capstone-boundary"><Icon name="warning" size={19} /><p><strong>Nada foi executado.</strong> Arquivos, endpoints, procedure, logs e resultados são fictícios. O caso ensina a sequência de decisões sem depender de chave, API, repositório externo ou ambiente de produção.</p></div>

    <ChoiceScenarioLab id="capstone-quiz" eyebrow="Decisão final" title="Você aprovaria o próximo passo?" scenarios={capstoneChoiceScenarios} disclaimer="O feedback resume os critérios apresentados no guia; não substitui revisão técnica do sistema real." className="capstone-quiz" />
  </section>
}

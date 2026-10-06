import { developmentQuizScenarios } from '../data/developmentAreas'
import ChoiceScenarioLab from './ChoiceScenarioLab'

export default function DevelopmentAreasQuiz() {
  return <ChoiceScenarioLab id="development-quiz" eyebrow="Verificação prática" title="Qual decisão protege melhor a mudança?" scenarios={developmentQuizScenarios} disclaimer="Cenários didáticos: no projeto real, confirme arquitetura, dados, permissões e critérios com as pessoas responsáveis." className="development-quiz" />
}

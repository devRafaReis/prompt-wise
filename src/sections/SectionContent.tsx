import WorkflowSection from '../components/WorkflowSection'
import type { TopicId } from '../data/training'
import { ModelsSection, RulesSection } from './AgentSections'
import AiLandscapeSection from './AiLandscapeSection'
import ArchitectureSection from './ArchitectureSection'
import CapstoneSection from './CapstoneSection'
import DevelopmentAreasSection from './DevelopmentAreasSection'
import FailureModesSection from './FailureModesSection'
import HumanReviewSection from './HumanReviewSection'
import { ClosingSection, ReviewSection, SafetySection } from './QualitySections'
import { OpeningSection, PromptsSection, WelcomeSection } from './StartSections'
import ProjectStorySection from './ProjectStorySection'
import RagSection from './RagSection'
import RiskFitSection from './RiskFitSection'
import SimulatedApplicationSection from './SimulatedApplicationSection'
import StudyModuleSection from './StudyModuleSection'
import TechniqueChoiceSection from './TechniqueChoiceSection'
import TokensSection from './TokensSection'

const sections = {
  inicio: WelcomeSection,
  abertura: OpeningSection,
  prompts: PromptsSection,
  modelos: ModelsSection,
  regras: RulesSection,
  fluxo: WorkflowSection,
  revisao: ReviewSection,
  tokens: TokensSection,
  mapa: AiLandscapeSection,
  rag: RagSection,
  avaliacao: () => <StudyModuleSection id="avaliacao" />,
  incerteza: () => <StudyModuleSection id="incerteza" />,
  embeddings: () => <StudyModuleSection id="embeddings" />,
  mcp: () => <StudyModuleSection id="mcp" />,
  contexto: () => <StudyModuleSection id="contexto" />,
  arquitetura: ArchitectureSection,
  frentes: DevelopmentAreasSection,
  aplicacao: SimulatedApplicationSection,
  tecnicas: TechniqueChoiceSection,
  aprovacao: HumanReviewSection,
  observabilidade: () => <StudyModuleSection id="observabilidade" />,
  falhas: FailureModesSection,
  governanca: () => <StudyModuleSection id="governanca" />,
  adequacao: RiskFitSection,
  seguranca: SafetySection,
  'caso-final': CapstoneSection,
  bastidores: ProjectStorySection,
  fechamento: ClosingSection,
} satisfies Record<TopicId, () => React.JSX.Element>

export default function SectionContent({ id }: { id: TopicId }) {
  const Component = sections[id]
  return <Component />
}

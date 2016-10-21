import { QuestionnaireType } from './QuestionnaireType'
import QuestionnairePath from './QuestionnairePath'
import QuestionnaireBlock from './Parser/QuestionnaireBlock'
import QuestionnaireLine from './Parser/QuestionnaireLine'
import QuestionnaireParser from './Parser/QuestionnaireParser'
import Utils from './Parser/Utils'
import QuestionnaireBlockRenderer from './Renderer/QuestionnaireBlockRenderer'
import QuestionnaireRenderer from './Renderer/QuestionnaireRenderer'

const Questionnaire = {
    QuestionnaireType,
    QuestionnairePath,
    Parser: {
        QuestionnaireBlock,
        QuestionnaireLine,
        QuestionnaireParser,
        Utils
    },
    Renderer: {
        QuestionnaireBlockRenderer,
        QuestionnaireRenderer
    }
}

export default Questionnaire
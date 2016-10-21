"use strict";
const QuestionnaireType_1 = require('./QuestionnaireType');
const QuestionnairePath_1 = require('./QuestionnairePath');
const QuestionnaireBlock_1 = require('./Parser/QuestionnaireBlock');
const QuestionnaireLine_1 = require('./Parser/QuestionnaireLine');
const QuestionnaireParser_1 = require('./Parser/QuestionnaireParser');
const Utils_1 = require('./Parser/Utils');
const QuestionnaireBlockRenderer_1 = require('./Renderer/QuestionnaireBlockRenderer');
const QuestionnaireRenderer_1 = require('./Renderer/QuestionnaireRenderer');
const Questionnaire = {
    QuestionnaireType: QuestionnaireType_1.QuestionnaireType,
    QuestionnairePath: QuestionnairePath_1.default,
    Parser: {
        QuestionnaireBlock: QuestionnaireBlock_1.default,
        QuestionnaireLine: QuestionnaireLine_1.default,
        QuestionnaireParser: QuestionnaireParser_1.default,
        Utils: Utils_1.default
    },
    Renderer: {
        QuestionnaireBlockRenderer: QuestionnaireBlockRenderer_1.default,
        QuestionnaireRenderer: QuestionnaireRenderer_1.default
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Questionnaire;

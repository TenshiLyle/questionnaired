"use strict";
const QuestionnaireType_1 = require('./QuestionnaireType');
const QuestionnaireParser_1 = require('./Parser/QuestionnaireParser');
const QuestionnaireRenderer_1 = require('./Renderer/QuestionnaireRenderer');
function questionnaired(path) {
    const parser = new QuestionnaireParser_1.default(path);
    const blocks = parser.parse();
    // We shouldn't be providing ca-school-php-introduction
    const renderer = new QuestionnaireRenderer_1.default(blocks, path, "ca-school-php-introduction");
    return renderer.render();
}
exports.questionnaired = questionnaired;
exports.namespace = {
    questionnaired,
    QuestionnaireType: QuestionnaireType_1.QuestionnaireType,
    Parser: {
        QuestionnaireParser: QuestionnaireParser_1.default
    },
    Renderer: {
        QuestionnaireRenderer: QuestionnaireRenderer_1.default
    }
};

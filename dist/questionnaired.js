"use strict";
const QuestionType_1 = require('./Parser/QuestionType');
const QuestionnaireParser_1 = require('./Parser/QuestionnaireParser');
const QuestionnaireRenderer_1 = require('./Renderer/QuestionnaireRenderer');
function render(path, rootFolderName) {
    const parser = new QuestionnaireParser_1.default(path);
    const questions = parser.parse();
    const renderer = new QuestionnaireRenderer_1.default(questions, path, rootFolderName);
    return renderer.render();
}
exports.render = render;
exports.questionnaired = {
    render,
    QuestionType: QuestionType_1.QuestionType,
    Parser: {
        QuestionnaireParser: QuestionnaireParser_1.default
    },
    Renderer: {
        QuestionnaireRenderer: QuestionnaireRenderer_1.default
    }
};

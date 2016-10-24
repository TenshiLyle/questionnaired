"use strict";
const QuestionnaireType_1 = require('./QuestionnaireType');
const QuestionnaireParser_1 = require('./Parser/QuestionnaireParser');
const QuestionnaireRenderer_1 = require('./Renderer/QuestionnaireRenderer');
function render(path, rootFolderName) {
    const parser = new QuestionnaireParser_1.default(path);
    const blocks = parser.parse();
    const renderer = new QuestionnaireRenderer_1.default(blocks, path, rootFolderName);
    return renderer.render();
}
exports.render = render;
exports.questionnaired = {
    render,
    QuestionnaireType: QuestionnaireType_1.QuestionnaireType,
    Parser: {
        QuestionnaireParser: QuestionnaireParser_1.default
    },
    Renderer: {
        QuestionnaireRenderer: QuestionnaireRenderer_1.default
    }
};

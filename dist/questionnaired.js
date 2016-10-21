"use strict";
const QuestionnaireParser_1 = require('./Parser/QuestionnaireParser');
const QuestionnaireRenderer_1 = require('./Renderer/QuestionnaireRenderer');
function questionnaired(path) {
    const parser = new QuestionnaireParser_1.default(path);
    const blocks = parser.parse();
    // We shouldn't be providing ca-school-php-introduction
    const renderer = new QuestionnaireRenderer_1.default(blocks, path, "ca-school-php-introduction");
    return renderer.render();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = questionnaired;

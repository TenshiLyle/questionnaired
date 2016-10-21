"use strict";
const QuestionnaireBlockRenderer_1 = require('./QuestionnaireBlockRenderer');
class QuestionnaireRenderer {
    constructor(parsedQuestions, sourcePath, repoName) {
        this.parsedQuestions = parsedQuestions;
        this.questionnaireSourcePath = sourcePath;
        this.questionnaireRepoName = repoName;
    }
    render() {
        let renderedBlockQuestion = new Array();
        this.parsedQuestions.forEach(function (questionnaireBlock, idx) {
            let questionnaireBlockRenderer = new QuestionnaireBlockRenderer_1.default(questionnaireBlock, this.questionnaireSourcePath, this.questionnaireRepoName);
            renderedBlockQuestion.push(questionnaireBlockRenderer.render());
        }, this);
        return renderedBlockQuestion.join(" ");
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionnaireRenderer;

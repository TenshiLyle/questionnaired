"use strict";
const QuestionRenderer_1 = require('./QuestionRenderer');
class QuestionnaireRenderer {
    constructor(parsedQuestions, sourcePath, repoName) {
        this.parsedQuestions = parsedQuestions;
        this.questionnaireSourcePath = sourcePath;
        this.questionnaireRepoName = repoName;
    }
    render() {
        const renderedQuestion = [];
        this.parsedQuestions.forEach((question, idx) => {
            const questionRenderer = new QuestionRenderer_1.default(question, this.questionnaireSourcePath, this.questionnaireRepoName);
            renderedQuestion.push(questionRenderer.render());
        }, this);
        return renderedQuestion.join(" ");
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionnaireRenderer;

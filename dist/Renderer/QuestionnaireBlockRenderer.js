"use strict";
const util = require('util');
const cheerio = require('cheerio');
const marked = require('marked');
const QuestionnaireType_1 = require('../QuestionnaireType');
class QuestionnaireBlockRenderer {
    constructor(questionnaireBlock, sourcePath, repoName) {
        this.questionnaireBlock = questionnaireBlock;
        this.sourcePath = sourcePath;
        this.repoName = repoName;
        this.cheerio = cheerio.load(`<div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body questionnaire-container">
                        </div>
                    </div>
                    <div class="questionnaire-validation-container">
                    </div>
                </div>
            </div>`);
    }
    render() {
        this.renderQuestionText();
        if (this.questionnaireBlock.type === QuestionnaireType_1.QuestionnaireType.CR) {
            this.appendElement(this.renderCR());
        }
        else if (this.questionnaireBlock.type === QuestionnaireType_1.QuestionnaireType.TI) {
            this.appendElement(this.renderTI());
        }
        else {
            this.appendElement(this.renderChoices());
        }
        this.appendElement(this.renderSubmit());
        return this.cheerio.html();
    }
    appendElement(element) {
        this.cheerio(".questionnaire-container").append(this.appendQuestionnaireElement(element));
    }
    appendQuestionnaireElement(element) {
        return util.format("<div class='questionnaire-element'>%s</div>", element);
    }
    renderQuestionText() {
        this.appendElement(marked(this.questionnaireBlock.text));
        // Need to add the number since marked removes the order number of the list.
        this.cheerio("ol").attr('start', this.questionnaireBlock.questionNumber);
    }
    renderChoices() {
        let html = '';
        let choices = this.questionnaireBlock.choices;
        for (let property in choices) {
            if (choices.hasOwnProperty(property)) {
                html += this.renderChoice(property, choices[property]) + "\n";
            }
        }
        return "<div class='questionnaire-choices'>" + html + "</div>";
    }
    renderChoice(ident, label) {
        return util.format("<div class='checkbox'><label><input type='checkbox' value='%s'>%s</label></div>", ident, marked(label));
    }
    renderTI() {
        let html = '';
        return `<input type="text" class="col-md-2 col-sm-3" /><br /><br />`;
    }
    renderSubmit() {
        return `<button type='button' class='btn btn-primary submit-user-answer' data-questionnaire-type='${this.questionnaireBlock.type}'
                    data-questionnaire-number='${this.questionnaireBlock.questionNumber}' data-questionnaire-source='${this.sourcePath}'
                    data-questionnaire-repo='${this.repoName}'>Submit</button>`;
    }
    renderCR() {
        return util.format("<p><div class='questionnaire-code-response' data-questionnaire-language='%s' data-quesionnaire-code='%s'></div></p>", this.questionnaireBlock.language, JSON.stringify(this.questionnaireBlock.code));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionnaireBlockRenderer;

"use strict";
const cheerio = require('cheerio');
const marked = require('marked');
const escapeHTML = require('escape-html');
class QuestionRenderer {
    constructor(question, sourcePath, repoName) {
        this.question = question;
        this.sourcePath = sourcePath;
        this.repoName = repoName;
        this.cheerio = cheerio.load(`<div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body question-container">
                        </div>
                    </div>
                    <div class="answer-feedback">
                    </div>
                </div>
            </div>`);
    }
    render() {
        this.renderQuestionText();
        if (this.question.isCR()) {
            this.appendElement(this.renderCR());
        }
        else if (this.question.isTI()) {
            this.appendElement(this.renderTI());
        }
        else {
            this.appendElement(this.renderChoices());
        }
        this.appendElement(this.renderSubmit());
        return this.cheerio.html();
    }
    appendElement(element) {
        this.cheerio(".question-container").append(this.appendQuestionnaireElement(element));
    }
    appendQuestionnaireElement(element) {
        return `<div class="question-element">${element}</div>`;
    }
    renderQuestionText() {
        this.appendElement(marked.parser(this.question.text));
        // Need to add the number since marked removes the order number of the list.
        this.cheerio("ol").attr('start', this.question.questionNumber);
    }
    renderChoices() {
        let html = '';
        const choices = this.question.choices;
        for (let property in choices) {
            if (choices.hasOwnProperty(property)) {
                html += this.renderChoice(property, choices[property]) + "\n";
            }
        }
        return "<div class='question-choices'>" + html + "</div>";
    }
    renderChoice(ident, label) {
        return `<div class="checkbox"><label><input type="checkbox" value="${ident}">${marked(label)}</label></div>`;
    }
    renderTI() {
        return `<input type="text" class="col-md-2 col-sm-3" /><br /><br />`;
    }
    renderSubmit() {
        return `<button type='button' class='btn btn-primary submit-user-answer' data-question-type='${this.question.type}'
                    data-question-number='${this.question.questionNumber}' data-questionnaire-source='${this.sourcePath}'
                    data-questionnaire-repo='${this.repoName}'>Submit</button>`;
    }
    renderCR() {
        const code = escapeHTML(this.question.code);
        return `<pre class="question-code-response ace-editor" data-lang="${this.question.language}" id="${this.sourcePath}-${this.question.questionNumber}">${code}</pre>`;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionRenderer;

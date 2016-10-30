import * as cheerio from 'cheerio'
import * as marked from 'marked'

import Question from '../Parser/Question'

const escapeHTML = require('escape-html');

export default class QuestionRenderer {
    private question: Question
    private sourcePath: string
    private repoName: string
    private cheerio: CheerioStatic

    constructor( question: Question, sourcePath: string, repoName: string ) {
        this.question           = question
        this.sourcePath         = sourcePath
        this.repoName           = repoName
        this.cheerio            = cheerio.load(
            `<div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body question-container">
                        </div>
                    </div>
                    <div class="answer-feedback">
                    </div>
                </div>
            </div>`
        );
    }

    render(): string {
        this.renderQuestionText()

        if ( this.question.isCR() ) {
            this.appendElement( this.renderCR() )
        }
        else if ( this.question.isTI() ) {
            this.appendElement( this.renderTI() )
        }
        else {
            this.appendElement( this.renderChoices() )
        }

        this.appendElement( this.renderSubmit() )

        return this.cheerio.html()
    }

    private appendElement(element: string): void {
        this.cheerio(".question-container").append( this.appendQuestionnaireElement( element ) )
    }

    private appendQuestionnaireElement(element: string): string {
        return `<div class="question-element">${element}</div>`
    }

    private renderQuestionText() :void {
        this.appendElement( marked.parser(this.question.text) );

        // Need to add the number since marked removes the order number of the list.
        this.cheerio("ol").attr('start', this.question.questionNumber)
    }

    private renderChoices(): string {
        let html: string = ''
        const choices = this.question.choices

        for ( let property in choices ) {
            if ( choices.hasOwnProperty( property ) ) {
                html += this.renderChoice( property, choices[property] ) + "\n"
            }
        }

        return "<div class='question-choices'>" + html + "</div>"
    } 

    private renderChoice( ident: string, label: string ) {
        return `<div class="checkbox"><label><input type="checkbox" value="${ident}">${marked(label)}</label></div>`
    }

    private renderTI(): string {
        return `<input type="text" class="col-md-2 col-sm-3" /><br /><br />`
    }

    private renderSubmit(): string {
        return `<button type='button' class='btn btn-primary submit-user-answer' data-question-type='${this.question.type}'
                    data-question-number='${this.question.questionNumber}' data-questionnaire-source='${this.sourcePath}'
                    data-questionnaire-repo='${this.repoName}'>Submit</button>`
    }

    private renderCR(): string {
        const code = escapeHTML( this.question.code )

        return `<pre class="question-code-response ace-editor" data-lang="${this.question.language}" id="${this.sourcePath}-${this.question.questionNumber}">${code}</pre>`
    }
}

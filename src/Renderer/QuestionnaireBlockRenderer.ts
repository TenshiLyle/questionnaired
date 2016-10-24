import * as cheerio from 'cheerio'
import * as marked from 'marked'

import QuestionnaireBlock from '../Parser/QuestionnaireBlock'
import { QuestionnaireType } from '../QuestionnaireType'

const escapeHTML = require('escape-html');

export default class QuestionnaireBlockRenderer {
    private questionnaireBlock: QuestionnaireBlock;
    private sourcePath: string;
    private repoName: string;
    private cheerio: CheerioStatic;

    constructor( questionnaireBlock: QuestionnaireBlock, sourcePath: string, repoName: string ) {
        this.questionnaireBlock = questionnaireBlock;
        this.sourcePath         = sourcePath;
        this.repoName           = repoName;
        this.cheerio            = cheerio.load(
            `<div class="row">
                <div class="col-md-12 col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-body questionnaire-container">
                        </div>
                    </div>
                    <div class="questionnaire-validation-container">
                    </div>
                </div>
            </div>`
        );
    }

    render(): string {
        this.renderQuestionText();

        if ( this.questionnaireBlock.type === QuestionnaireType.CR ) {
            this.appendElement( this.renderCR() );
        }
        else if ( this.questionnaireBlock.type === QuestionnaireType.TI) {
            this.appendElement( this.renderTI() );
        }
        else {
            this.appendElement( this.renderChoices() );
        }

        this.appendElement( this.renderSubmit() );

        return this.cheerio.html();
    }

    private appendElement(element: string): void {
        this.cheerio(".questionnaire-container").append( this.appendQuestionnaireElement( element ) );
    }

    private appendQuestionnaireElement(element: string): string {
        return `<div class="questionnaire-element">${element}</div>`;
    }

    private renderQuestionText() :void {
        this.appendElement( marked(this.questionnaireBlock.text) );

        // Need to add the number since marked removes the order number of the list.
        this.cheerio("ol").attr('start', this.questionnaireBlock.questionNumber);
    }

    private renderChoices(): string {
        let html: string = '';
        let choices = this.questionnaireBlock.choices;

        for ( let property in choices ) {
            if ( choices.hasOwnProperty( property ) ) {
                html += this.renderChoice( property, choices[property] ) + "\n";
            }
        }

        return "<div class='questionnaire-choices'>" + html + "</div>";
    } 

    private renderChoice( ident: string, label: string ) {
        return `<div class="checkbox"><label><input type="checkbox" value="${ident}">${marked(label)}</label></div>`;
    }

    private renderTI(): string {
        return `<input type="text" class="col-md-2 col-sm-3" /><br /><br />`;
    }

    private renderSubmit(): string {
        return `<button type='button' class='btn btn-primary submit-user-answer' data-questionnaire-type='${this.questionnaireBlock.type}'
                    data-questionnaire-number='${this.questionnaireBlock.questionNumber}' data-questionnaire-source='${this.sourcePath}'
                    data-questionnaire-repo='${this.repoName}'>Submit</button>`;
    }

    private renderCR(): string {
        const code = escapeHTML( this.questionnaireBlock.code.join("\n\n") );

        return `<p><pre class="questionnaire-code-response ace-editor" data-lang="${this.questionnaireBlock.language}" id="${this.sourcePath}-${this.questionnaireBlock.questionNumber}">${code}</pre></p>`;
    }
}

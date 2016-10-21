import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'
import * as path from 'path'

import QuestionnaireBlock from './QuestionnaireBlock'
import QuestionnaireLine from './QuestionnaireLine'
import Utils from './Utils'
import { QuestionnaireType } from '../QuestionnaireType'

const markdown = require('markdown-it');

export default class QuestionnaireParser {

    private questionFilePath: string;
    private answerFilePath: string;

    constructor( questionFilePath: string ) {
        this.questionFilePath = questionFilePath;
        this.answerFilePath = this.getAnswerFilePath();

        let questionStat = fs.statSync( this.questionFilePath );
        let answerStat = fs.statSync( this.answerFilePath );

        if ( !questionStat.isFile() ) {
            throw new Error("Question File " + this.questionFilePath + " does not exists");
        }

        if( !answerStat.isFile() ) {
            throw new Error("Answer File " + this.answerFilePath + " does not exists");
        }
    }

    parse(): Array<QuestionnaireBlock> {
        let questionContent = this.readQuestionFile();

        let md = new markdown('zero');

        let tokens = md.parse( questionContent );

        return this.parseTokens( tokens );
    }

    private parseTokens( tokens: Array<{}> ): Array<QuestionnaireBlock> {
        let questionBlocks = new Array();
        let isInsideCodeBlock = false;
        let depth: number = 0;
        let questionBlock = new Array();
        let answers = this.readAnswerFile();

        // I have to put all code blocks into an array. So we won't have to scan the code block for the ace editor part.
        // We know that the last code block for a CR type is the one that will be rendered by the ace editor.
        let codeBlock = new Array();

        while( tokens.length > 0 ) {
            let tok: any = tokens.shift();

            if ( tok.type === 'inline' ) {
                let questionLine = new QuestionnaireLine( tok.content );
                
                if ( questionLine.isStartQuestion() && !isInsideCodeBlock && questionBlock.length > 0 ) {
                    questionBlocks.push( this.parseQuestionBlock( questionBlock, answers ) );
                    questionBlock = new Array();
                }

                if ( questionLine.isCodeBlock() ) {
                    if ( isInsideCodeBlock ) {
                        // If we're inside a code block and found another code marker with a language on it, MD will include it as part of the code block.
                        if ( questionLine.hasLanguage() ) {
                            codeBlock.push( questionLine );
                        }
                        else { // If no language was included, then MD assume it's the end of the code block.
                            isInsideCodeBlock = false;
                            depth--;

                            if ( depth < 0 ) {
                                throw new Error("Unable to parse Questionnaire File. Unmatch Code Block markers found at " + tok.content);
                            }

                            codeBlock.push( questionLine );
                            questionBlock.push( codeBlock );
                            depth = 0;
                            codeBlock = [];
                        }
                    }
                    else {
                        codeBlock.push( questionLine );
                        
                        // For code block which only has a single line of code and without any line space between the code marker.
                        if ( questionLine.isSingleLineCode() ) {
                            questionBlock.push( codeBlock );
                            codeBlock = [];
                        }
                        else {
                            isInsideCodeBlock = true;
                            depth++;
                        }
                    }
                }
                else {
                    if ( isInsideCodeBlock ) {
                        codeBlock.push( questionLine );
                    }
                    else {
                        questionBlock.push( questionLine );
                    }
                }
            }
        }

        if ( isInsideCodeBlock ) {
            throw new Error("Unable to parse Questionnaire File. Unmatch Code Block markers found.");
        }

        if ( questionBlock.length > 0 ) {
            questionBlocks.push( this.parseQuestionBlock( questionBlock, answers ) );
        }

        return questionBlocks;
    }

    private parseQuestionBlock( questionBlock: Array<any>, answers: any ): QuestionnaireBlock {
        let questionnaireBlock = new QuestionnaireBlock();
        
        questionnaireBlock.questionNumber = questionBlock[0].getQuestionNumber();
        questionnaireBlock.type = this.getQuestionType( questionBlock, answers, questionnaireBlock.questionNumber );
        questionnaireBlock.answer = answers[questionnaireBlock.questionNumber];

        let questionText: Array<string> = [];

        if ( questionnaireBlock.type === QuestionnaireType.CR ) {
            //For CR type the last element of a questionBlock is an array which is the code block that will be rendered by the Ace Editor.
            let codeBlock = questionBlock.pop();
            questionnaireBlock.language = codeBlock[0].getLanguage();
            questionnaireBlock.code = [];

            codeBlock.forEach( (x: QuestionnaireLine) => questionnaireBlock.code.push( x.getCode() ) );

            // We then put the rest of the block as part of the question text.
            questionBlock.forEach( (elem: any) => {
                if ( elem instanceof QuestionnaireLine ) {
                    questionText.push( elem.questionLine );
                }
                else { // For Code Block that is part of the question text.
                    elem.forEach( (x: QuestionnaireLine ) => questionText.push( x.questionLine ));
                }
            });
        }
        else {
            // For TI, MS and MC type of question.
            questionBlock.forEach( questionnaireLine => {
                if ( questionnaireLine instanceof Array ) { // CodeBlock element that is part of the question text.. 
                    questionnaireLine.forEach( codeLine => {
                        questionText.push( codeLine.questionLine );
                    })
                }
                else if ( questionnaireLine.isOption() ) { // Options element e.g "a. First Choice"
                    let [optionKey, optionValue] = questionnaireLine.getOption();
                        
                    if ( !questionnaireBlock.hasChoices() ) {
                        questionnaireBlock.choices = {};
                    }

                    questionnaireBlock.choices[optionKey] = optionValue;
                }
                else {
                    questionText.push( questionnaireLine.questionLine );
                }
            })
        }

        questionnaireBlock.text = questionText.join("\n\n");

        if ( !questionnaireBlock.isValid() ) {
            throw new Error("Invalid Question found: " + JSON.stringify(questionnaireBlock));
        }

        return questionnaireBlock;
    }

    private getQuestionType( questionBlock: Array<any>, answers: any, questionNumber: string ) {
        let answer: any = answers[questionNumber];

        if ( answer ) {
            if( answer instanceof Array ) {
                return QuestionnaireType.MS;
            }
            else if ( Utils.isAnswerProofMarker( answer.toString() ) ) {
                return QuestionnaireType.CR;
            }
            else if ( questionBlock[questionBlock.length - 1 ].isOption() ) {
                return QuestionnaireType.MC;
            }
            else {
                return QuestionnaireType.TI;
            }
        }
        else {
            throw new Error("No answer found for question " + questionNumber);
        }
    }

    private readQuestionFile(): string {
        return fs.readFileSync( this.questionFilePath, 'utf8' );
    }

    private readAnswerFile(): string {
        return yaml.safeLoad(fs.readFileSync( this.answerFilePath, 'utf8' ) );
    }

    private getAnswerFilePath(): string {
        let questionFile: string = path.basename(this.questionFilePath);
        let answerFile: string = `${path.basename(this.questionFilePath, '.q.md')}.yml`;

        answerFile = this.questionFilePath.replace(questionFile, answerFile);

        return answerFile;
    }
}

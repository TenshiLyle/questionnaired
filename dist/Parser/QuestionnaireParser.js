"use strict";
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
const QuestionnaireBlock_1 = require('./QuestionnaireBlock');
const QuestionnaireLine_1 = require('./QuestionnaireLine');
const Utils_1 = require('./Utils');
const QuestionnaireType_1 = require('../QuestionnaireType');
const markdown = require('markdown-it');
class QuestionnaireParser {
    constructor(questionFilePath) {
        this.questionFilePath = questionFilePath;
        this.answerFilePath = this.getAnswerFilePath();
        let questionStat = fs.statSync(this.questionFilePath);
        let answerStat = fs.statSync(this.answerFilePath);
        if (!questionStat.isFile()) {
            throw new Error("Question File " + this.questionFilePath + " does not exists");
        }
        if (!answerStat.isFile()) {
            throw new Error("Answer File " + this.answerFilePath + " does not exists");
        }
    }
    parse() {
        let questionContent = this.readQuestionFile();
        let md = new markdown('zero');
        let tokens = md.parse(questionContent);
        return this.parseTokens(tokens);
    }
    parseTokens(tokens) {
        let questionBlocks = new Array();
        let isInsideCodeBlock = false;
        let depth = 0;
        let questionBlock = new Array();
        let answers = this.readAnswerFile();
        // I have to put all code blocks into an array. So we won't have to scan the code block for the ace editor part.
        // We know that the last code block for a CR type is the one that will be rendered by the ace editor.
        let codeBlock = new Array();
        while (tokens.length > 0) {
            let tok = tokens.shift();
            if (tok.type === 'inline') {
                let questionLine = new QuestionnaireLine_1.default(tok.content);
                if (questionLine.isStartQuestion() && !isInsideCodeBlock && questionBlock.length > 0) {
                    questionBlocks.push(this.parseQuestionBlock(questionBlock, answers));
                    questionBlock = new Array();
                }
                if (questionLine.isCodeBlock()) {
                    if (isInsideCodeBlock) {
                        // If we're inside a code block and found another code marker with a language on it, MD will include it as part of the code block.
                        if (questionLine.hasLanguage()) {
                            codeBlock.push(questionLine);
                        }
                        else {
                            isInsideCodeBlock = false;
                            depth--;
                            if (depth < 0) {
                                throw new Error("Unable to parse Questionnaire File. Unmatch Code Block markers found at " + tok.content);
                            }
                            codeBlock.push(questionLine);
                            questionBlock.push(codeBlock);
                            depth = 0;
                            codeBlock = [];
                        }
                    }
                    else {
                        codeBlock.push(questionLine);
                        // For code block which only has a single line of code and without any line space between the code marker.
                        if (questionLine.isSingleLineCode()) {
                            questionBlock.push(codeBlock);
                            codeBlock = [];
                        }
                        else {
                            isInsideCodeBlock = true;
                            depth++;
                        }
                    }
                }
                else {
                    if (isInsideCodeBlock) {
                        codeBlock.push(questionLine);
                    }
                    else {
                        questionBlock.push(questionLine);
                    }
                }
            }
        }
        if (isInsideCodeBlock) {
            throw new Error("Unable to parse Questionnaire File. Unmatch Code Block markers found.");
        }
        if (questionBlock.length > 0) {
            questionBlocks.push(this.parseQuestionBlock(questionBlock, answers));
        }
        return questionBlocks;
    }
    parseQuestionBlock(questionBlock, answers) {
        let questionnaireBlock = new QuestionnaireBlock_1.default();
        questionnaireBlock.questionNumber = questionBlock[0].getQuestionNumber();
        questionnaireBlock.type = this.getQuestionType(questionBlock, answers, questionnaireBlock.questionNumber);
        questionnaireBlock.answer = answers[questionnaireBlock.questionNumber];
        let questionText = [];
        if (questionnaireBlock.type === QuestionnaireType_1.QuestionnaireType.CR) {
            //For CR type the last element of a questionBlock is an array which is the code block that will be rendered by the Ace Editor.
            let codeBlock = questionBlock.pop();
            questionnaireBlock.language = codeBlock[0].getLanguage();
            questionnaireBlock.code = [];
            codeBlock.forEach((x) => questionnaireBlock.code.push(x.getCode()));
            // We then put the rest of the block as part of the question text.
            questionBlock.forEach((elem) => {
                if (elem instanceof QuestionnaireLine_1.default) {
                    questionText.push(elem.questionLine);
                }
                else {
                    elem.forEach((x) => questionText.push(x.questionLine));
                }
            });
        }
        else {
            // For TI, MS and MC type of question.
            questionBlock.forEach(questionnaireLine => {
                if (questionnaireLine instanceof Array) {
                    questionnaireLine.forEach(codeLine => {
                        questionText.push(codeLine.questionLine);
                    });
                }
                else if (questionnaireLine.isOption()) {
                    let [optionKey, optionValue] = questionnaireLine.getOption();
                    if (!questionnaireBlock.hasChoices()) {
                        questionnaireBlock.choices = {};
                    }
                    questionnaireBlock.choices[optionKey] = optionValue;
                }
                else {
                    questionText.push(questionnaireLine.questionLine);
                }
            });
        }
        questionnaireBlock.text = questionText.join("\n\n");
        if (!questionnaireBlock.isValid()) {
            throw new Error("Invalid Question found: " + JSON.stringify(questionnaireBlock));
        }
        return questionnaireBlock;
    }
    getQuestionType(questionBlock, answers, questionNumber) {
        let answer = answers[questionNumber];
        if (answer) {
            if (answer instanceof Array) {
                return QuestionnaireType_1.QuestionnaireType.MS;
            }
            else if (Utils_1.default.isAnswerProofMarker(answer.toString())) {
                return QuestionnaireType_1.QuestionnaireType.CR;
            }
            else if (questionBlock[questionBlock.length - 1].isOption()) {
                return QuestionnaireType_1.QuestionnaireType.MC;
            }
            else {
                return QuestionnaireType_1.QuestionnaireType.TI;
            }
        }
        else {
            throw new Error("No answer found for question " + questionNumber);
        }
    }
    readQuestionFile() {
        return fs.readFileSync(this.questionFilePath, 'utf8');
    }
    readAnswerFile() {
        return yaml.safeLoad(fs.readFileSync(this.answerFilePath, 'utf8'));
    }
    getAnswerFilePath() {
        let questionFile = path.basename(this.questionFilePath);
        let answerFile = `${path.basename(this.questionFilePath, '.q.md')}.yml`;
        answerFile = this.questionFilePath.replace(questionFile, answerFile);
        return answerFile;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionnaireParser;

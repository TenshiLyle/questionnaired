"use strict";
const fs = require('fs-extra');
const yaml = require('js-yaml');
const path = require('path');
const marked = require('marked');
const util = require('util');
const Question_1 = require('./Question');
const QuestionToken_1 = require('./QuestionToken');
const Answer_1 = require('./Answer');
const QuestionType_1 = require('./QuestionType');
class QuestionnaireParser {
    constructor(questionFilePath) {
        this.questionFilePath = questionFilePath;
        this.answerFilePath = this.getAnswerFilePath();
        let questionStat = fs.statSync(this.questionFilePath);
        let answerStat = fs.statSync(this.answerFilePath);
        if (!questionStat.isFile()) {
            throw new Error(`Question File ${this.questionFilePath} does not exists`);
        }
        if (!answerStat.isFile()) {
            throw new Error(`Answer File ${this.answerFilePath} does not exists`);
        }
    }
    parse() {
        const tokens = marked.lexer(this.readQuestionFile());
        return this.parseTokens(tokens);
    }
    parseTokens(tokens) {
        const questions = [];
        const groupTokens = this.groupTokens(tokens);
        return this.parseGroupTokens(groupTokens);
    }
    parseGroupTokens(groupTokens) {
        const answers = this.readAnswerFile();
        const questions = [];
        groupTokens.forEach((tokens, index) => {
            const question = new Question_1.default();
            const answer = new Answer_1.default(answers[index + 1]);
            if (answer.isCR()) {
                const token = tokens.pop(); // Last token of a group is a code block that will be rendered by the Ace Editor
                question.type = QuestionType_1.QuestionType.CR;
                question.language = token.getLang();
                question.code = token.getText();
                question.text = tokens.map((tok) => tok.getToken());
            }
            else {
                while (tokens.length > 0) {
                    const tok = tokens.shift();
                    if (tok.isOption()) {
                        if (!question.hasChoices())
                            question.choices = {};
                        if (!question.hasType())
                            question.type = answer.isMS() ? QuestionType_1.QuestionType.MS : QuestionType_1.QuestionType.MC;
                        const [key, value] = tok.getOption();
                        question.choices[key] = value;
                        // Peak the next token if it's a space, we'll need to remove it since it's not needed
                        if (tokens.length > 0 && tokens[tokens.length - 1].isSpaceToken())
                            tokens.shift();
                    }
                    else {
                        question.text.push(tok.getToken());
                    }
                }
            }
            if (!question.hasType())
                question.type = QuestionType_1.QuestionType.TI; // Default type is TI
            question.questionNumber = index + 1;
            question.answer = answer.getAnswer();
            if (question.isValid()) {
                question.text.links = {}; // This is required for the marked.parser() to work
                questions.push(question);
            }
            else {
                throw new Error(`Invalid Question: ${util.inspect(question)}`);
            }
        });
        return questions;
    }
    groupTokens(tokens) {
        const groupTokens = [];
        let group = [];
        tokens.forEach(tok => {
            const token = new QuestionToken_1.default(tok);
            if (token.isStartQuestion() && group.length > 0) {
                groupTokens.push(group);
                group = [];
            }
            group.push(token);
        });
        groupTokens.push(group);
        return groupTokens;
    }
    readQuestionFile() {
        return fs.readFileSync(this.questionFilePath, 'utf8');
    }
    readAnswerFile() {
        return yaml.safeLoad(fs.readFileSync(this.answerFilePath, 'utf8'));
    }
    getAnswerFilePath() {
        const questionFile = path.basename(this.questionFilePath);
        const answerFile = `${path.basename(this.questionFilePath, '.q.md')}.yml`;
        return this.questionFilePath.replace(questionFile, answerFile);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionnaireParser;

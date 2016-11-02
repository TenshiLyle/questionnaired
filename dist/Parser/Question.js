"use strict";
const QuestionType_1 = require('./QuestionType');
class Question {
    constructor() {
        this.text = [];
    }
    isValid() {
        if (this.isMC() || this.isMS()) {
            if (this.hasText()
                && this.hasType()
                && this.hasAnswer()
                && this.hasChoices()
                && this.hasQuestionNumber()) {
                return true;
            }
        }
        else if (this.isCR()) {
            if (this.hasText()
                && this.hasType()
                && this.hasLanguage()
                && this.hasCode()
                && this.hasQuestionNumber()) {
                return true;
            }
        }
        else {
            if (this.hasText()
                && this.hasType()
                && this.hasQuestionNumber()) {
                return true;
            }
        }
        return false;
    }
    hasText() {
        let hasText = false;
        this.text.forEach((tok) => {
            if (tok.hasOwnProperty('text') && tok.text.length > 0)
                hasText = true;
        });
        return hasText;
    }
    hasQuestionNumber() {
        if (this.questionNumber === undefined)
            return false;
        return true;
    }
    hasType() {
        if (this.type === undefined)
            return false;
        return true;
    }
    hasAnswer() {
        if (this.answer === undefined)
            return false;
        return true;
    }
    hasChoices() {
        if (this.choices === undefined)
            return false;
        return true;
    }
    hasLanguage() {
        if (this.language === undefined)
            return false;
        return true;
    }
    hasCode() {
        if (this.code === undefined)
            return false;
        return true;
    }
    isCR() {
        if (this.type === QuestionType_1.QuestionType.CR)
            return true;
        return false;
    }
    isMC() {
        if (this.type === QuestionType_1.QuestionType.MC)
            return true;
        return false;
    }
    isMS() {
        if (this.type === QuestionType_1.QuestionType.MS)
            return true;
        return false;
    }
    isTI() {
        if (this.type === QuestionType_1.QuestionType.TI)
            return true;
        return false;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Question;

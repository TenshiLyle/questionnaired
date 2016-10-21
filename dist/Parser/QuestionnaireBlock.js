"use strict";
const QuestionnaireType_1 = require('../QuestionnaireType');
class QuestionnaireBlock {
    isValid() {
        if (this.type === QuestionnaireType_1.QuestionnaireType.MC || this.type === QuestionnaireType_1.QuestionnaireType.MS) {
            if (this.hasText()
                && this.hasType()
                && this.hasAnswer()
                && this.hasChoices()
                && this.hasQuestionNumber()) {
                return true;
            }
        }
        else if (this.type === QuestionnaireType_1.QuestionnaireType.CR) {
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
        if (this.text === undefined) {
            return false;
        }
        return true;
    }
    hasQuestionNumber() {
        if (this.questionNumber === undefined) {
            return false;
        }
        return true;
    }
    hasType() {
        if (this.type === undefined) {
            return false;
        }
        return true;
    }
    hasAnswer() {
        if (this.answer === undefined) {
            return false;
        }
        return true;
    }
    hasChoices() {
        if (this.choices === undefined) {
            return false;
        }
        return true;
    }
    hasLanguage() {
        if (this.language === undefined) {
            return false;
        }
        return true;
    }
    hasCode() {
        if (this.code === undefined) {
            return false;
        }
        return true;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionnaireBlock;

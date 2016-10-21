"use strict";
const Utils_1 = require('./Utils');
class QuestionnaireLine {
    constructor(text) {
        this.questionLine = text;
    }
    getMaxPos() {
        return this.questionLine.length - 1;
    }
    getCharCode(pos) {
        return this.questionLine.charCodeAt(pos);
    }
    getStartQuestion() {
        let pos = 0;
        let ch;
        let question;
        if (this.isStartQuestion()) {
            for (;;) {
                ch = this.getCharCode(pos);
                if (Utils_1.default.isSpace(ch)) {
                    question = this.questionLine.slice(pos + 1);
                    break;
                }
                else {
                    pos++;
                    continue;
                }
            }
            return question;
        }
        else {
            throw new Error("Cannot get the question string as this line doesn't seem to be the beginning of a question.");
        }
    }
    getQuestionNumber() {
        let number;
        let pos = 0;
        let ch;
        let maxPos = this.getMaxPos();
        if (this.isStartQuestion()) {
            while (pos <= maxPos) {
                ch = this.getCharCode(pos);
                if (Utils_1.default.isDigit(ch)) {
                    pos++;
                }
                else {
                    number = this.questionLine.slice(0, pos);
                    break;
                }
            }
            return number;
        }
        else {
            throw new Error("Cannot get the question number as this line doesn't start with the question marker: " + this.questionLine);
        }
    }
    getOption() {
        if (this.isOption()) {
            let key = this.questionLine.slice(0, 1);
            let value = this.questionLine.slice(3);
            return new Array(key, value);
        }
        else {
            throw new Error("Cannot get the question option as this line doesn't start with the option marker.");
        }
    }
    getLanguage() {
        let pos = 3;
        let language;
        let ch;
        let maxPos = this.getMaxPos();
        if (this.isStartCode()) {
            while (pos <= maxPos) {
                ch = this.getCharCode(pos);
                if (Utils_1.default.isLineFeed(ch)) {
                    language = this.questionLine.slice(3, pos);
                    break;
                }
                pos++;
            }
            return language;
        }
        else {
            throw new Error("Cannot get the language as this line doesn't start with the code marker.");
        }
    }
    getCode() {
        let pos = 3;
        let ch;
        let code = '';
        let maxPos = this.getMaxPos();
        let maxChar = this.questionLine.length;
        if (this.isStartCode()) {
            while (pos <= maxPos) {
                ch = this.getCharCode(pos);
                if (Utils_1.default.isLineFeed(ch)) {
                    code = this.questionLine.slice(pos + 1);
                    // For single line code block the parser puts the whole code block in a single token.
                    if (this.isEndCode()) {
                        code = code.slice(0, code.length - 4);
                    }
                    break;
                }
                pos++;
            }
            return code;
        }
        else if (this.isEndCode()) {
            return this.questionLine.slice(0, this.questionLine.length - 4);
        }
        else {
            return this.questionLine;
        }
    }
    isStartQuestion() {
        let pos = 0;
        let ch;
        let isStartingQuestion = false;
        let maxPos = this.getMaxPos();
        while (pos <= maxPos) {
            ch = this.getCharCode(pos);
            // The first character of a start of a question is a digit.
            if (pos == 0 && !Utils_1.default.isDigit(ch)) {
                break;
            }
            if (Utils_1.default.isDigit(ch)) {
                pos++;
            }
            else if (Utils_1.default.isDot(ch) && pos > 0) {
                ch = this.getCharCode(pos + 1);
                if (Utils_1.default.isSpace(ch)) {
                    isStartingQuestion = true;
                }
                break;
            }
            else {
                break;
            }
        }
        return isStartingQuestion;
    }
    isOption() {
        if (Utils_1.default.isOptionMarker(this.getCharCode(0))
            && Utils_1.default.isDot(this.getCharCode(1))
            && Utils_1.default.isSpace(this.getCharCode(2))) {
            return true;
        }
        return false;
    }
    isCodeBlock() {
        if (this.isStartCode()) {
            return true;
        }
        else if (this.isEndCode()) {
            return true;
        }
        return false;
    }
    isSingleLineCode() {
        if (this.questionLine.length > 3 && this.isStartCode() && this.isEndCode()) {
            return true;
        }
        return false;
    }
    hasLanguage() {
        let codeHasLanguage = false;
        try {
            let language = this.getLanguage();
            //No error so it has a langauge.
            if (typeof language !== 'undefined') {
                codeHasLanguage = true;
            }
            else {
                codeHasLanguage = false;
            }
        }
        catch (err) {
            codeHasLanguage = false;
        }
        return codeHasLanguage;
    }
    isStartCode() {
        if (Utils_1.default.isCodeMarker(this.getCharCode(0))
            && Utils_1.default.isCodeMarker(this.getCharCode(1))
            && Utils_1.default.isCodeMarker(this.getCharCode(2))) {
            return true;
        }
        return false;
    }
    isEndCode() {
        let sliceLine = this.questionLine.slice(this.questionLine.length - 3);
        if (Utils_1.default.isCodeMarker(sliceLine.charCodeAt(0))
            && Utils_1.default.isCodeMarker(sliceLine.charCodeAt(1))
            && Utils_1.default.isCodeMarker(sliceLine.charCodeAt(2))) {
            return true;
        }
        return false;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionnaireLine;

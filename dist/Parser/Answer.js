"use strict";
const Utils_1 = require('./Utils');
class Answer {
    constructor(answer) {
        this.answer = answer;
    }
    getAnswer() {
        return this.answer;
    }
    isCR() {
        return Utils_1.default.isAnswerProofMarker(`${this.answer}`);
    }
    isMS() {
        return this.answer instanceof Array;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Answer;

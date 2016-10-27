"use strict";
const Utils_1 = require('./Utils');
class QuestionToken {
    constructor(token) {
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    getText() {
        return this.token.text || '';
    }
    getLang() {
        return this.token.lang;
    }
    isStartQuestion() {
        if (this.isListStart())
            return true;
        return false;
    }
    isSpaceToken() {
        if (this.token.type === 'space')
            return true;
        return false;
    }
    isCodeToken() {
        if (this.token.type === 'code')
            return true;
        return false;
    }
    isListEndToken() {
        if (this.token.type === 'list_end')
            return true;
        return false;
    }
    isListItemEndToken() {
        if (this.token.type === 'list_item_end')
            return true;
        return false;
    }
    isListStart() {
        if (this.token.type === 'list_start')
            return true;
        return false;
    }
    isOption() {
        let pos = 0;
        const maxPos = this.getMaxPos();
        while (pos <= maxPos) {
            if (Utils_1.default.isSpace(this.getCharCode(pos))) {
                pos++;
                continue;
            }
            if (Utils_1.default.isOptionMarker(this.getCharCode(pos))
                && Utils_1.default.isDot(this.getCharCode(pos + 1))
                && Utils_1.default.isSpace(this.getCharCode(pos + 2))) {
                return true;
            }
            return false;
        }
        return false;
    }
    getOption() {
        if (this.isOption()) {
            let pos = 0;
            const maxPos = this.getMaxPos();
            while (pos <= maxPos) {
                if (Utils_1.default.isSpace(this.getCharCode(pos))) {
                    pos++;
                    continue;
                }
                break;
            }
            const key = this.getText().slice(pos, pos + 1);
            const value = this.getText().slice(pos + 3);
            return [key, value];
        }
        else {
            throw new Error(`This token doesn't have the option marker: ${this.getText()}.`);
        }
    }
    getCharCode(pos) {
        return this.getText().charCodeAt(pos);
    }
    getMaxPos() {
        return this.getText().length - 1;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuestionToken;

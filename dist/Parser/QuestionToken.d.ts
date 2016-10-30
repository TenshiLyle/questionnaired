export default class QuestionToken {
    private token;
    constructor(token: any);
    getToken(): any;
    getText(): string;
    getLang(): string;
    isStartQuestion(): boolean;
    isSpaceToken(): boolean;
    isCodeToken(): boolean;
    isListEndToken(): boolean;
    isListItemEndToken(): boolean;
    isListStart(): boolean;
    isOption(): boolean;
    getOption(): Array<string>;
    getCharCode(pos: number): number;
    getMaxPos(): number;
}

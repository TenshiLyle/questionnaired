export default class Utils {
    static isAdditionalQuestionMarker(code: number): boolean;
    static isCodeMarker(code: number): boolean;
    static isOptionMarker(code: number): boolean;
    static isDot(code: number): boolean;
    static isSpace(code: number): boolean;
    static isDigit(code: number): boolean;
    static isLineFeed(code: number): boolean;
    static isAnswerProofMarker(line: string): boolean;
}

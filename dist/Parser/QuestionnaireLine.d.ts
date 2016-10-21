export default class QuestionnaireLine {
    questionLine: string;
    constructor(text: string);
    getMaxPos(): number;
    getCharCode(pos: number): number;
    getStartQuestion(): string;
    getQuestionNumber(): string;
    getOption(): Array<string>;
    getLanguage(): string;
    getCode(): string;
    isStartQuestion(): boolean;
    isOption(): boolean;
    isCodeBlock(): boolean;
    isSingleLineCode(): boolean;
    hasLanguage(): boolean;
    isStartCode(): boolean;
    isEndCode(): boolean;
}

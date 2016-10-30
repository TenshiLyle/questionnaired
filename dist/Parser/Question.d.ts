export interface ChoiceMap {
    [key: string]: string;
}
export default class Question {
    questionNumber: number;
    text: any;
    type: string;
    answer: any;
    choices?: ChoiceMap;
    language?: string;
    code?: string;
    constructor();
    isValid(): boolean;
    hasText(): boolean;
    hasQuestionNumber(): boolean;
    hasType(): boolean;
    hasAnswer(): boolean;
    hasChoices(): boolean;
    hasLanguage(): boolean;
    hasCode(): boolean;
    isCR(): boolean;
    isMC(): boolean;
    isMS(): boolean;
    isTI(): boolean;
}

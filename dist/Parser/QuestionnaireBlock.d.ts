export interface ChoiceMap {
    [key: string]: string;
}
export default class QuestionnaireBlock {
    questionNumber: string;
    text: string;
    type: string;
    answer: any;
    choices?: ChoiceMap;
    language?: string;
    code?: Array<string>;
    isValid(): boolean;
    hasText(): boolean;
    hasQuestionNumber(): boolean;
    hasType(): boolean;
    hasAnswer(): boolean;
    hasChoices(): boolean;
    hasLanguage(): boolean;
    hasCode(): boolean;
}

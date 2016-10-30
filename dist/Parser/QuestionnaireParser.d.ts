import Question from './Question';
import QuestionToken from './QuestionToken';
export interface QuestionTokenList {
    [index: number]: QuestionToken;
}
export default class QuestionnaireParser {
    private questionFilePath;
    private answerFilePath;
    constructor(questionFilePath: string);
    parse(): Array<Question>;
    private parseTokens(tokens);
    private parseGroupTokens(groupTokens);
    private groupTokens(tokens);
    private readQuestionFile();
    private readAnswerFile();
    private getAnswerFilePath();
}

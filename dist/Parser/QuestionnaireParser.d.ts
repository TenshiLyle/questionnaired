import QuestionnaireBlock from './QuestionnaireBlock';
export default class QuestionnaireParser {
    private questionFilePath;
    private answerFilePath;
    constructor(questionFilePath: string);
    parse(): Array<QuestionnaireBlock>;
    private parseTokens(tokens);
    private parseQuestionBlock(questionBlock, answers);
    private getQuestionType(questionBlock, answers, questionNumber);
    private readQuestionFile();
    private readAnswerFile();
    private getAnswerFilePath();
}

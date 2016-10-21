import QuestionnaireBlock from '../Parser/QuestionnaireBlock';
export default class QuestionnaireBlockRenderer {
    private questionnaireBlock;
    private sourcePath;
    private repoName;
    private cheerio;
    constructor(questionnaireBlock: QuestionnaireBlock, sourcePath: string, repoName: string);
    render(): string;
    private appendElement(element);
    private appendQuestionnaireElement(element);
    private renderQuestionText();
    private renderChoices();
    private renderChoice(ident, label);
    private renderTI();
    private renderSubmit();
    private renderCR();
}

import Question from '../Parser/Question';
export default class QuestionRenderer {
    private question;
    private sourcePath;
    private repoName;
    private cheerio;
    constructor(question: Question, sourcePath: string, repoName: string);
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

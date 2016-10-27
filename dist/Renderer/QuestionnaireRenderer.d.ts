import Question from '../Parser/Question';
export default class QuestionnaireRenderer {
    private parsedQuestions;
    private questionnaireSourcePath;
    private questionnaireRepoName;
    constructor(parsedQuestions: Array<Question>, sourcePath: string, repoName: string);
    render(): string;
}

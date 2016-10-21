import QuestionnaireBlock from '../Parser/QuestionnaireBlock';
export default class QuestionnaireRenderer {
    private parsedQuestions;
    private questionnaireSourcePath;
    private questionnaireRepoName;
    constructor(parsedQuestions: Array<QuestionnaireBlock>, sourcePath: string, repoName: string);
    render(): string;
}

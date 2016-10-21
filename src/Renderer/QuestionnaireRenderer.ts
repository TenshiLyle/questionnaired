import QuestionnaireBlockRenderer from './QuestionnaireBlockRenderer'
import QuestionnaireBlock from '../Parser/QuestionnaireBlock'
import QuestionnaireParser from '../Parser/QuestionnaireParser'

export default class QuestionnaireRenderer {
    private parsedQuestions: Array<QuestionnaireBlock>;
    private questionnaireSourcePath: string;
    private questionnaireRepoName: string;

    constructor( parsedQuestions: Array<QuestionnaireBlock>, sourcePath: string, repoName: string ) {
        this.parsedQuestions            = parsedQuestions;
        this.questionnaireSourcePath    = sourcePath;
        this.questionnaireRepoName      = repoName;
    }

    render(): string {
        let renderedBlockQuestion: Array<string> = new Array();
        
        this.parsedQuestions.forEach( function( questionnaireBlock: QuestionnaireBlock, idx: number ) {
            let questionnaireBlockRenderer = new QuestionnaireBlockRenderer( questionnaireBlock, this.questionnaireSourcePath, this.questionnaireRepoName );

            renderedBlockQuestion.push( questionnaireBlockRenderer.render() );
        }, this);

        return renderedBlockQuestion.join(" ");
    }
}

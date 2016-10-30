import QuestionRenderer from './QuestionRenderer'
import Question from '../Parser/Question'

export default class QuestionnaireRenderer {
    private parsedQuestions: Array<Question>
    private questionnaireSourcePath: string
    private questionnaireRepoName: string

    constructor( parsedQuestions: Array<Question>, sourcePath: string, repoName: string ) {
        this.parsedQuestions            = parsedQuestions
        this.questionnaireSourcePath    = sourcePath
        this.questionnaireRepoName      = repoName
    }

    render(): string {
        const renderedQuestion: Array<string> = []
        
        this.parsedQuestions.forEach( ( question: Question, idx: number ) => {
            const questionRenderer = new QuestionRenderer( question, this.questionnaireSourcePath, this.questionnaireRepoName )

            renderedQuestion.push( questionRenderer.render() )
        }, this);

        return renderedQuestion.join(" ")
    }
}

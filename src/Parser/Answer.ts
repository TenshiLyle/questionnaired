import Utils from './Utils'

export default class Answer {
    private answer: any

    constructor( answer: any ) {
        this.answer = answer
    }

    getAnswer(): any {
        return this.answer
    }

    isCR(): boolean {
        return Utils.isAnswerProofMarker( `${this.answer}` )
    }

    isMS(): boolean {
        return this.answer instanceof Array
    }
}
import { QuestionType } from './QuestionType'

export interface ChoiceMap {
    [key: string]: string;
}

export default class Question {
    questionNumber  : number
    text            : any
    type            : string
    answer          : any
    choices?        : ChoiceMap
    language?       : string
    code?           : string

    constructor() {
        this.text = []
    }

    isValid(): boolean {
        if( this.isMC() || this.isMS() ) {
            if( this.hasText()
                && this.hasType()
                && this.hasAnswer()
                && this.hasChoices()
                && this.hasQuestionNumber() ) {
                    return true
            }
        }
        else if ( this.isCR() ) {
            if ( this.hasText()
                && this.hasType()
                && this.hasLanguage()
                && this.hasCode() 
                && this.hasQuestionNumber() ) {
                    return true
            }
        }
        else {
            if ( this.hasText() 
                && this.hasType() 
                && this.hasQuestionNumber() ) {
                    return true
            }
        }

        return false
    }

    hasText(): boolean {
        let hasText = false
        
        this.text.forEach( (tok: any) => {
            if ( tok.hasOwnProperty('text' && tok.text.length > 0 )) hasText = true
        })

        return hasText
    }

    hasQuestionNumber(): boolean {
        if ( this.questionNumber === undefined ) return false

        return true
    }

    hasType(): boolean {
        if ( this.type === undefined ) return false

        return true
    }

    hasAnswer(): boolean {
        if ( this.answer === undefined ) return false

        return true
    }

    hasChoices(): boolean {
        if ( this.choices === undefined ) return false

        return true
    }

    hasLanguage(): boolean {
        if ( this.language === undefined ) return false

        return true
    }

    hasCode(): boolean {
        if ( this.code === undefined ) return false

        return true
    }

    isCR(): boolean {
        if ( this.type === QuestionType.CR ) return true
        return false
    }

    isMC(): boolean {
        if ( this.type === QuestionType.MC ) return true
        return false
    }

    isMS(): boolean {
        if ( this.type === QuestionType.MS ) return true
        return false
    }

    isTI(): boolean {
        if ( this.type === QuestionType.TI ) return true
        return false
    }
}

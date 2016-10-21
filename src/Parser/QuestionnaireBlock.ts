import { QuestionnaireType } from '../QuestionnaireType'

export interface ChoiceMap {
    [key: string]: string;
}

export default class QuestionnaireBlock {
    questionNumber  : string;
    text            : string;
    type            : string;
    answer          : any;
    choices?        : ChoiceMap;
    language?       : string;
    code?           : Array<string>;

    isValid() {
        if( this.type === QuestionnaireType.MC || this.type === QuestionnaireType.MS ) {
            if( this.hasText()
                && this.hasType()
                && this.hasAnswer()
                && this.hasChoices()
                && this.hasQuestionNumber() ) {
                    return true;
            }
        }
        else if ( this.type === QuestionnaireType.CR ) {
            if ( this.hasText()
                && this.hasType()
                && this.hasLanguage()
                && this.hasCode() 
                && this.hasQuestionNumber() ) {
                    return true;
            }
        }
        else {
            if ( this.hasText() 
                && this.hasType() 
                && this.hasQuestionNumber() ) {
                    return true;
            }
        }

        return false;
    }

    hasText() {
        if ( this.text === undefined ) {
            return false;
        }

        return true;
    }

    hasQuestionNumber() {
        if ( this.questionNumber === undefined ) {
            return false;
        }

        return true;
    }

    hasType() {
        if ( this.type === undefined ) {
            return false;
        }

        return true;
    }

    hasAnswer() {
        if ( this.answer === undefined ) {
            return false;
        }

        return true;
    }

    hasChoices() {
        if ( this.choices === undefined ) {
            return false;
        }

        return true;
    }

    hasLanguage() {
        if ( this.language === undefined ) {
            return false;
        }

        return true;
    }

    hasCode() {
        if ( this.code === undefined ) {
            return false;
        }

        return true;
    }
}

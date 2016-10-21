import Utils from './Utils'

export default class QuestionnaireLine {
    questionLine: string;

    constructor( text: string ) {
        this.questionLine = text;
    }

    getMaxPos(): number {
        return this.questionLine.length - 1;
    }

    getCharCode( pos: number ): number {
        return this.questionLine.charCodeAt(pos);
    }

    getStartQuestion(): string {
        let pos = 0;
        let ch: number;
        let question: string;

        if ( this.isStartQuestion() ) {
            for(;;) {
                ch = this.getCharCode(pos);

                if ( Utils.isSpace(ch) ) {
                    question = this.questionLine.slice( pos + 1 );
                    break;
                }
                else {
                    pos++;
                    continue;
                }
            }

            return question;
        }
        else {
            throw new Error("Cannot get the question string as this line doesn't seem to be the beginning of a question.");
        }
    }

    getQuestionNumber(): string {
        let number: string;
        let pos = 0;
        let ch: number;
        let maxPos = this.getMaxPos();

        if ( this.isStartQuestion() ) {
            while ( pos <= maxPos ) {
                ch = this.getCharCode(pos);

                if ( Utils.isDigit(ch) ) {
                    pos++;
                }
                else {
                    number = this.questionLine.slice(0, pos);
                    break;
                }
            }

            return number;
        }
        else {
            throw new Error("Cannot get the question number as this line doesn't start with the question marker: " + this.questionLine);
        }
    }

    getOption(): Array<string> {
        if ( this.isOption() ) {
            let key: string = this.questionLine.slice(0, 1);
            let value: string = this.questionLine.slice(3);

            return new Array(key, value);
        }
        else {
            throw new Error("Cannot get the question option as this line doesn't start with the option marker.");
        }
    }

    getLanguage(): string {
        let pos: number = 3;
        let language: string;
        let ch: number;
        let maxPos = this.getMaxPos();

        if ( this.isStartCode() ) {
            while( pos <= maxPos ) {
                ch = this.getCharCode(pos);

                if ( Utils.isLineFeed( ch ) ) {
                    language = this.questionLine.slice(3, pos);
                    break;
                }

                pos++;
            }

            return language;
        }
        else {
            throw new Error("Cannot get the language as this line doesn't start with the code marker."); 
        }
    }

    getCode(): string {
        let pos: number = 3;
        let ch: number;
        let code: string = '';
        let maxPos = this.getMaxPos();
        let maxChar = this.questionLine.length;

        if ( this.isStartCode() ) {
            while ( pos <= maxPos ) {
                ch = this.getCharCode(pos);

                if ( Utils.isLineFeed( ch ) ) {
                    code = this.questionLine.slice( pos+1 );

                    // For single line code block the parser puts the whole code block in a single token.
                    if ( this.isEndCode() ) {
                        code = code.slice( 0, code.length - 4 );
                        
                    }
                    break;
                }
                
                pos++;
            }

            return code;
        }
        else if ( this.isEndCode() ) {
            return this.questionLine.slice( 0, this.questionLine.length - 4 );    
        }
        else {
            return this.questionLine;
        }
    }

    isStartQuestion(): boolean {
        let pos = 0;
        let ch: number;
        let isStartingQuestion = false;
        let maxPos = this.getMaxPos();
        
        while ( pos <= maxPos ) {
            ch = this.getCharCode(pos);

            // The first character of a start of a question is a digit.
            if ( pos == 0 && !Utils.isDigit(ch) ) {
                break;
            }

            if( Utils.isDigit(ch) ) { // A question must be 1 or more digits
                pos++;
            }
            else if ( Utils.isDot(ch) && pos > 0 ) { // Followed by a dot character.
                ch = this.getCharCode(pos + 1);

                if ( Utils.isSpace(ch) ) { // And a space.
                    isStartingQuestion = true;
                }
                
                break;
            }
            else {
                break;
            }
        }

        return isStartingQuestion;
    }

    isOption(): boolean {
        if ( Utils.isOptionMarker( this.getCharCode(0) )
            && Utils.isDot( this.getCharCode(1) )
            && Utils.isSpace( this.getCharCode(2) ) ) {
                return true;
        }

        return false;
    }

    isCodeBlock(): boolean {
        if ( this.isStartCode() ) {
            return true;
        }
        else if ( this.isEndCode() ) {
            return true;
        }
        
        return false;
    }

    isSingleLineCode(): boolean {
        if ( this.questionLine.length > 3 && this.isStartCode() && this.isEndCode() ) {
            return true;
        }
        
        return false;
    }

    hasLanguage(): boolean {
        let codeHasLanguage = false;

        try {
            let language = this.getLanguage();
            //No error so it has a langauge.
            if ( typeof language !== 'undefined') {
                codeHasLanguage = true;
            }
            else {
                codeHasLanguage = false;
            }
        }
        catch(err) {
            codeHasLanguage = false;
        }
        
        return codeHasLanguage;
    }

    isStartCode(): boolean {
        if ( Utils.isCodeMarker( this.getCharCode(0) )
            && Utils.isCodeMarker( this.getCharCode(1) )
            && Utils.isCodeMarker( this.getCharCode(2) ) ) {
                return true;
        }

        return false;
    }

    isEndCode(): boolean {
        let sliceLine: string = this.questionLine.slice( this.questionLine.length - 3 );

        if ( Utils.isCodeMarker( sliceLine.charCodeAt(0) )
            && Utils.isCodeMarker( sliceLine.charCodeAt(1) )
            && Utils.isCodeMarker( sliceLine.charCodeAt(2) ) ) {
                return true;
        }

        return false;
    }
}

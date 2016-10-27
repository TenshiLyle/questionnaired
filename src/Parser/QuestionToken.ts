import Utils from './Utils'

export default class QuestionToken {
    private token: any

    constructor( token: any ) {
        this.token = token
    }

    getToken(): any {
        return this.token
    }

    getText(): string {
        return this.token.text || ''
    }

    getLang(): string {
        return this.token.lang
    }

    isStartQuestion(): boolean {
        if ( this.isListStart() ) return true
        return false
    }

    isSpaceToken(): boolean {
        if ( this.token.type === 'space' ) return true
        return false
    }

    isCodeToken(): boolean {
        if ( this.token.type === 'code' ) return true
        return false
    }

    isListEndToken(): boolean {
        if ( this.token.type === 'list_end' ) return true
        return false
    }

    isListItemEndToken(): boolean {
        if ( this.token.type === 'list_item_end' ) return true
        return false
    }

    isListStart(): boolean {
        if ( this.token.type === 'list_start' ) return true
        return false
    }

    isOption(): boolean {
        let pos = 0
        const maxPos = this.getMaxPos()

        while ( pos <= maxPos ) {
            if ( Utils.isSpace( this.getCharCode(pos) ) ) {
                pos++
                continue
            }

            if ( Utils.isOptionMarker( this.getCharCode(pos) )
                && Utils.isDot( this.getCharCode(pos + 1) )
                && Utils.isSpace( this.getCharCode(pos + 2) ) ) {
                    return true
            }

            return false
        }

        return false
    }

    getOption(): Array<string> {
        if ( this.isOption() ) {
            let pos = 0
            const maxPos = this.getMaxPos()

            while ( pos <= maxPos ) {
                if ( Utils.isSpace( this.getCharCode(pos) ) ) {
                    pos++
                    continue
                }
                
                break
            }

            const key: string = this.getText().slice(pos, pos + 1);
            const value: string = this.getText().slice(pos + 3);

            return [key, value]
        }
        else {
            throw new Error(`This token doesn't have the option marker: ${this.getText()}.`);
        }
    }

    getCharCode( pos: number ): number {
        return this.getText().charCodeAt(pos);
    }

    getMaxPos(): number {
        return this.getText().length - 1;
    }
}
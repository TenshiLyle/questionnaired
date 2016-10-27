import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'
import * as path from 'path'
import * as marked from 'marked'
import * as util from 'util'

import Question from './Question'
import QuestionToken from './QuestionToken'
import Answer from './Answer'
import { QuestionType } from './QuestionType'

const markdown = require('markdown-it');

export interface QuestionTokenList {
    [ index: number ]: QuestionToken
}

export default class QuestionnaireParser {
    private questionFilePath: string
    private answerFilePath: string

    constructor( questionFilePath: string ) {
        this.questionFilePath = questionFilePath
        this.answerFilePath = this.getAnswerFilePath()

        let questionStat = fs.statSync( this.questionFilePath )
        let answerStat = fs.statSync( this.answerFilePath )

        if ( !questionStat.isFile() ) {
            throw new Error(`Question File ${this.questionFilePath} does not exists`)
        }

        if( !answerStat.isFile() ) {
            throw new Error(`Answer File ${this.answerFilePath} does not exists`)
        }
    }

    parse(): Array<Question> {
        const tokens = marked.lexer( this.readQuestionFile() )

        return this.parseTokens( tokens )
    }

    private parseTokens( tokens: Array<any> ): Array<Question> {
        const questions: Array<Question> = []

        const groupTokens = this.groupTokens( tokens )
       
        return this.parseGroupTokens( groupTokens )
    }

    private parseGroupTokens( groupTokens: Array<QuestionTokenList> ): Array<Question> {
        const answers = this.readAnswerFile()
        const questions: Array<Question> = []

        groupTokens.forEach( ( tokens: Array<QuestionToken>, index: number ) => {
            const question = new Question()
            const answer = new Answer( answers[ index + 1 ] )

            if ( answer.isCR() ) {
                const token = tokens.pop() // Last token of a group is a code block that will be rendered by the Ace Editor

                question.type = QuestionType.CR
                question.language = token.getLang()
                question.code = token.getText()
                question.text = tokens.map( ( tok: QuestionToken ) => tok.getToken() )
            }
            else {
                while( tokens.length > 0 ) {
                    const tok = tokens.shift()

                    if ( tok.isOption() ) {
                        if ( !question.hasChoices() ) question.choices = {}
                        if ( !question.hasType() ) question.type = answer.isMS() ? QuestionType.MS : QuestionType.MC
                        const [key, value] = tok.getOption()
                        question.choices[key] = value

                        // Peak the next token if it's a space, we'll need to remove it since it's not needed
                        if ( tokens.length > 0 && tokens[tokens.length - 1].isSpaceToken() ) tokens.shift()
                    }
                    else {
                        question.text.push( tok.getToken() )
                    }
                }
            }

            if ( !question.hasType() ) question.type = QuestionType.TI // Default type is TI
            question.questionNumber = index + 1
            question.answer = answer.getAnswer()

            if ( question.isValid() ) {
                question.text.links = {} // This is required for the marked.parser() to work
                questions.push(question)
            }
            else {
                throw new Error(`Invalid Question: ${util.inspect(question)}`)
            }
        })

        return questions
    }

    private groupTokens( tokens: Array<any> ): Array<QuestionTokenList> {
        const groupTokens: Array<QuestionTokenList> = []
        let group: Array<QuestionToken> = []

        tokens.forEach( tok => {
            const token = new QuestionToken( tok )
            if ( token.isStartQuestion() && group.length > 0 ) {
                groupTokens.push( group )
                group = []
            }
            
            group.push( token )
        })

        groupTokens.push( group )

        return groupTokens
    }

    private readQuestionFile(): string {
        return fs.readFileSync( this.questionFilePath, 'utf8' )
    }

    private readAnswerFile(): string {
        return yaml.safeLoad(fs.readFileSync( this.answerFilePath, 'utf8' ) )
    }

    private getAnswerFilePath(): string {
        const questionFile: string = path.basename(this.questionFilePath)
        const answerFile: string = `${path.basename(this.questionFilePath, '.q.md')}.yml`

        return this.questionFilePath.replace(questionFile, answerFile)
    }
}

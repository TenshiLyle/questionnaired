import QuestionToken from '../src/Parser/QuestionToken'

describe("A QuestionToken takes a token from the marked lexer", function() {
    it("parse the token and able to ask if this is a start of a question", function() {
        const token = new QuestionToken({ type: 'list_start', ordered: true })
        expect( token.isStartQuestion() ).toBe(true)
    })

    it("can parse space token", function() {
        const token = new QuestionToken({ type: 'space' })
        expect( token.isSpaceToken() ).toBe(true)
    })

    it("can also parse code token", function() {
        const token = new QuestionToken({ type: 'code', lang: 'php', text: '$var = 1;' })
        expect( token.isCodeToken() ).toBe(true)
    })

    it("can also parse token with option marker", function() {
        const token = new QuestionToken({ type: 'paragraph', text: ' a. It has least one digit `test`' })
        expect( token.isOption() ).toBe(true)
    })

    it("can also retrieve the language identifier of a code block", function() {
        const token = new QuestionToken({ type: 'code', lang: 'php', text: '$var = 1;' })
        expect( token.getLang() ).toEqual('php')
    })
})
import Question from '../src/Parser/Question'
import { QuestionType } from '../src/Parser/QuestionType'

describe("A Question represent a single question from the questionnaire file", function() {
    const question = createNonCRQuestion()
    const CRQuestion = createCRQuestion()

    it("it can validate a question", function() {
        expect( question.isValid() ).toBe(true)
        question.type = undefined
        expect( question.isValid() ).toBe(false)

        expect( CRQuestion.isValid() ).toBe(true)
        CRQuestion.type = undefined
        expect( CRQuestion.isValid() ).toBe(false)
    })
})

function createCRQuestion(): Question {
    const question = new Question()

    question.text = createQuestionText()
    question.questionNumber = 2
    question.type = QuestionType.CR
    question.language = 'php'
    question.code = `<?php\n$count = 0;\n ?>`
    question.answer = "@proof:/path/to/proof/file"

    return question
}

function createNonCRQuestion(): Question {
    const question = new Question()

    question.text = createQuestionText()
    question.questionNumber = 1
    question.type = QuestionType.MC
    question.choices = {
        "a": "Sandae",
        "b": "Jerome",
        "c": "Mark",
        "d": "Nino"
    }
    question.answer = "b"
    return question
}

function createQuestionText(): Array<any> {
    return [
        { type: 'list_start', ordered: true },
        { type: 'loose_item_start' },
        { type: 'text', text: 'Who am I?' },
        { type: 'space' }
    ]
}

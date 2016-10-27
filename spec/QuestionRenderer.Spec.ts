import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'

import QuestionRenderer from '../src/Renderer/QuestionRenderer'
import Question from '../src/Parser/Question'
import * as cheerio from 'cheerio'
import { QuestionType } from '../src/Parser/QuestionType'

describe("A Question Renderer renders a single Question instance.", function() {
    makeQuestion();
    makeAnswer();

    const question = new Question()
    question.text = [
        { type: 'list_start', ordered: true },
        { type: 'loose_item_start' },
        { type: 'text', text: 'What is my name?' },
        { type: 'space' },
        { type: 'list_item_end' },
        { type: 'list_end' }
    ]
    question.text.links = {}

    question.choices = {
        "a": "Sandae",
        "b": "Jerome",
        "c": "Mark",
        "d": "Nino"
    }

    question.type = QuestionType.MC
    question.questionNumber = 1
    question.answer = "b"

    const renderer = new QuestionRenderer(question, '/tmp/foo', '/tmp')
    const result = renderer.render()
    const ch = cheerio.load( result )

    it("The rendered html should be contained within a bootstrap row div", function() {
        expect( ch('.row').find('div').hasClass('col-md-12') ).toBe(true);
    });

    it("It should also be contained within a boostrap panel", function() {
        expect( ch('.col-md-12').find('div').hasClass('panel') ).toBe(true);
        expect( ch('.col-md-12').find('.panel-body').hasClass('question-container') ).toBe(true);
    });

    it("It should have multiple element with a question-element class", function() {
        expect( ch('.question-element').length ).toBe(3);
    });

    it("The first questionnaire-element class should be the question text", function() {
        ch('.question-element').each(function(i, elem) {
            if ( i == 0 ) {
                expect( ch(elem).text() ).toMatch(/What is my name?/);
            }
            else if ( i == 1 ) {
                expect( ch(elem).children().hasClass('question-choices') ).toBe(true);
            }
            else if ( i == 2 ) {
                expect( ch(elem).children().hasClass('btn-primary') ).toBe(true);
            }
            else {
                return false;
            }
        });
    });
})

function makeQuestion() {
    let questionText = `1. What is my name?

 a. Sandae

 b. Jerome

 c. Mark

 d. Nino

2. This is a multiple-selection type of question

 a. W

 b. C

 c. D

3. This question can submit code:

\`\`\`php
$variable = 1;
\`\`\``;

    fs.writeFileSync('/tmp/test-question.q.md', questionText);
}

function makeAnswer() {
    let answerText = {
        1: 'c',
        2: ['a','b'],
        3: "@proof/Chapter-01/IncreaseVariable.php"
    };

    fs.writeFileSync('/tmp/test-question.yml', yaml.safeDump(answerText));
}

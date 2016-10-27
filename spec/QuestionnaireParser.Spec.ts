import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'

import QuestionnaireParser from '../src/Parser/QuestionnaireParser'
import Question from '../src/Parser/Question'
import * as util from 'util'

describe("Question Parser parses a question file parser, it requires a .q.md file", function() {
    makeQuestion();
    makeAnswer();

    const questionnaireParser: QuestionnaireParser = new QuestionnaireParser('/tmp/test-question.q.md');
    const result = questionnaireParser.parse();

    it("Parse method should give us an array of Question", function() {
        expect( result instanceof Array ).toBe(true);
    });

    it("Question represent a single question written by an author.", function() {
        let question: Question = result[0];

        expect( question.type === 'MC' ).toBe(true);
        expect( question.answer === 'c' ).toBe(true);

        question = result[1];

        expect( question.type === 'MS' ).toBe(true);

        question = result[2];

        expect( question.type === 'CR' ).toBe(true);
        expect( question.language === 'php' ).toBe(true);
        expect( question.code === '$variable = 1;' ).toBe(true);
    });

    //fs.unlinkSync('/tmp/test-question.q.md');
    //fs.unlinkSync('/tmp/test-question.yml');
});

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
        3: "@proof:/Chapter-01/IncreaseVariable.php"
    };

    fs.writeFileSync('/tmp/test-question.yml', yaml.safeDump(answerText));
}

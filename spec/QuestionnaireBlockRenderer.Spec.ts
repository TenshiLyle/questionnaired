import QuestionnaireBlockRenderer from '../src/Renderer/QuestionnaireBlockRenderer'
import QuestionnaireBlock from '../src/Parser/QuestionnaireBlock'
import * as cheerio from 'cheerio';
import { QuestionnaireType } from '../src/QuestionnaireType'

describe("A QuestionnaireBlockRenderer renders a QuestionBlock instance.", function() {
    let qBlock = new QuestionnaireBlock();

    qBlock.text = "What is my name?";
    qBlock.type = QuestionnaireType.MC;
    qBlock.choices = {
        "a": "Sandae",
        "b": "Jerome",
        "c": "Mark",
        "d": "Nino"
    };
    qBlock.answer = "b";
    qBlock.questionNumber = "1";

    let qBlockRenderer = new QuestionnaireBlockRenderer( qBlock, '/tmp/testing/test-question.q.md', 'testing' );
    let html = qBlockRenderer.render();
    let ch = cheerio.load( html );

    it("It will generate a html string for the given QuestionnaireBlock instance", function() {
        expect( typeof html === "string" ).toBe(true);
    });

    it("The rendered html should be contained within a bootstrap row div", function() {
        expect( ch('.row').find('div').hasClass('col-md-12') ).toBe(true);
    });

    it("It should also be contained within a boostrap panel", function() {
        expect( ch('.col-md-12').find('div').hasClass('panel') ).toBe(true);
        expect( ch('.col-md-12').find('.panel-body').hasClass('questionnaire-container') ).toBe(true);
    });

    it("It should have multiple element with a questionnaire-element class", function() {
        expect( ch('.questionnaire-element').length ).toBe(3);
    });

    it("The first questionnaire-element class should be the question text", function() {
        ch('.questionnaire-element').each(function(i, elem) {
            if ( i == 0 ) {
                expect( ch(elem).text() ).toMatch(/What is my name?/);
            }
            else if ( i == 1 ) {
                expect( ch(elem).children().hasClass('questionnaire-choices') ).toBe(true);
            }
            else if ( i == 2 ) {
                expect( ch(elem).children().hasClass('btn-primary') ).toBe(true);
            }
            else {
                return false;
            }
        });
    });
});

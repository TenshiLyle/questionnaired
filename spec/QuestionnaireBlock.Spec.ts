import QuestionnaireBlock from '../src/Parser/QuestionnaireBlock'
import { QuestionnaireType } from '../src/QuestionnaireType'

describe("A Question Block represent a complete question. MC and MS type of question behave similarly. ", function() {
    let qBlock: QuestionnaireBlock = new QuestionnaireBlock();
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

    it("It can only be a valid question if it has a text, type, choice and an answer", function() {
        expect( qBlock.isValid() ).toBe(true);
        
        qBlock.text = undefined;

        expect(qBlock.isValid() ).toBe(false);
    });
});

describe("A CR type of of question is the third type of question.", function() {
    let qBlock: QuestionnaireBlock = new QuestionnaireBlock();
    qBlock.text = "Increment the variable to 3";
    qBlock.type = QuestionnaireType.CR;
    qBlock.answer = "@proof/test-proof.php";
    qBlock.language = 'php';
    qBlock.code = new Array("var $count = 0;");
    qBlock.questionNumber = "2";

    it("It doesn't need the choices, but requires the language and code attribute", function() {
        expect( qBlock.isValid() ).toBe(true);

        qBlock.language = undefined;

        expect( qBlock.isValid() ).toBe(false);
    });
});

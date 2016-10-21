import QuestionnaireLine from '../src/Parser/QuestionnaireLine'

describe("A Questionnaire Line represents a single token content from the Markdown-it Parser", function() {
    let startQuestionLine = new QuestionnaireLine("1. This is a first Question.");
    let additionalQuestionLine = new QuestionnaireLine("> another thought in here");
    let choiceLine = new QuestionnaireLine("a. Rianne");
    let startCodeLine = new QuestionnaireLine("```php\n$counter = 1;");
    let endCodeLine = new QuestionnaireLine("$counter++;\n```");

    it("It can be ask if the line in question is the start of a question", function() {
        expect( startQuestionLine.isStartQuestion() ).toBe(true);  
        expect( additionalQuestionLine.isStartQuestion() ).toBe(false);
    });

    it("Or if it's a choice question", function() {
        expect( choiceLine.isOption() ).toBe(true);
        expect( additionalQuestionLine.isOption() ).toBe(false);
    });

    it("Or if it's a start of a code Line", function() {
        expect( startCodeLine.isStartCode() ).toBe(true);
        expect( endCodeLine.isStartCode() ).toBe(false);
    });

    it("Or if it's the end of a code line", function() {
        expect( endCodeLine.isEndCode() ).toBe(true);
        expect( startCodeLine.isEndCode() ).toBe(false);
    });
});

describe("A Question Line class can be used to break down the necessary information for that line", function() {

    let startQuestionLine = new QuestionnaireLine("1. This is a first Question.");
    let additionalQuestionLine = new QuestionnaireLine("> another thought in here");
    let choiceLine = new QuestionnaireLine("a. Rianne");
    let startCodeLine = new QuestionnaireLine("```php\n$counter = 1;");
    let endCodeLine = new QuestionnaireLine("$counter++;\n```");

    it("You can retrieve the question number", function() {
        expect( startQuestionLine.getQuestionNumber() ).toBe("1");
    });

    it("Or the question itself", function() {
        expect( startQuestionLine.getStartQuestion() ).toBe("This is a first Question.");
    });

    it("Or the option which is represented in an Array where the first element is the identifier and the second one is the option itself", function() {
        let options: Array<string> = choiceLine.getOption();

        expect( options[0] ).toBe("a");
        expect( options[1] ).toBe("Rianne");
    });

    it("Or the language for the code submitted questions", function() {
        expect( startCodeLine.getLanguage() ).toBe('php');
    });

    it("Or the initial code", function() {
        expect( startCodeLine.getCode() ).toBe("$counter = 1;");
    });
});

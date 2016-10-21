declare module 'questionnaire-mdPath' {
	export default class QuestionnairePath {
	    static getPublicPath(path: string, splitter: string): string;
	}

}
declare module 'questionnaire-md' {
	import QuestionnairePath from 'QuestionnairePath';
	import QuestionnaireBlock from 'Parser/QuestionnaireBlock';
	import QuestionnaireLine from 'Parser/QuestionnaireLine';
	import QuestionnaireParser from 'Parser/QuestionnaireParser';
	import Utils from 'Parser/Utils';
	import QuestionnaireBlockRenderer from 'Renderer/QuestionnaireBlockRenderer';
	import QuestionnaireRenderer from 'Renderer/QuestionnaireRenderer'; const Questionnaire: {
	    QuestionnaireType: {
	        "CR": string;
	        "MC": string;
	        "MS": string;
	        "TI": string;
	    };
	    QuestionnairePath: typeof QuestionnairePath;
	    Parser: {
	        QuestionnaireBlock: typeof QuestionnaireBlock;
	        QuestionnaireLine: typeof QuestionnaireLine;
	        QuestionnaireParser: typeof QuestionnaireParser;
	        Utils: typeof Utils;
	    };
	    Renderer: {
	        QuestionnaireBlockRenderer: typeof QuestionnaireBlockRenderer;
	        QuestionnaireRenderer: typeof QuestionnaireRenderer;
	    };
	};
	export default Questionnaire;

}

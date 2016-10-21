import QuestionnaireParser from './Parser/QuestionnaireParser';
import QuestionnaireRenderer from './Renderer/QuestionnaireRenderer';
export declare function questionnaired(path: string): string;
export declare const namespace: {
    questionnaired: (path: string) => string;
    QuestionnaireType: {
        "CR": string;
        "MC": string;
        "MS": string;
        "TI": string;
    };
    Parser: {
        QuestionnaireParser: typeof QuestionnaireParser;
    };
    Renderer: {
        QuestionnaireRenderer: typeof QuestionnaireRenderer;
    };
};

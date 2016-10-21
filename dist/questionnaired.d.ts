import QuestionnaireParser from './Parser/QuestionnaireParser';
import QuestionnaireRenderer from './Renderer/QuestionnaireRenderer';
export declare function render(path: string, rootFolderName: string): string;
export declare const namespace: {
    render: (path: string, rootFolderName: string) => string;
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

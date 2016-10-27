import { QuestionType } from './Parser/QuestionType'
import QuestionnaireParser from './Parser/QuestionnaireParser'
import QuestionnaireRenderer from './Renderer/QuestionnaireRenderer'

export function render(path: string, rootFolderName: string): string {
    const parser = new QuestionnaireParser(path)
    const questions = parser.parse()
    
    const renderer = new QuestionnaireRenderer(questions, path, rootFolderName)
    return renderer.render()
}

export const questionnaired = {
    render,
    QuestionType,
    Parser: {
        QuestionnaireParser
    },
    Renderer: {
        QuestionnaireRenderer
    }
}

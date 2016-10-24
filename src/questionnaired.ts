import { QuestionnaireType } from './QuestionnaireType'
import QuestionnaireParser from './Parser/QuestionnaireParser'
import QuestionnaireRenderer from './Renderer/QuestionnaireRenderer'

export function render(path: string, rootFolderName: string): string {
    const parser = new QuestionnaireParser(path)
    const blocks = parser.parse()
    
    const renderer = new QuestionnaireRenderer(blocks, path, rootFolderName)
    return renderer.render()
}

export const questionnaired = {
    render,
    QuestionnaireType,
    Parser: {
        QuestionnaireParser
    },
    Renderer: {
        QuestionnaireRenderer
    }
}

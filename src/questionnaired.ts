import { QuestionnaireType } from './QuestionnaireType'
import QuestionnaireParser from './Parser/QuestionnaireParser'
import QuestionnaireRenderer from './Renderer/QuestionnaireRenderer'

export default function questionnaired(path: string): string {
    const parser = new QuestionnaireParser(path)
    const blocks = parser.parse()
    
    // We shouldn't be providing ca-school-php-introduction
    const renderer = new QuestionnaireRenderer(blocks, path, "ca-school-php-introduction")
    return renderer.render()
}
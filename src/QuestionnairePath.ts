export default class QuestionnairePath {

    static getPublicPath( path: string, splitter: string ): string {
        let splitPath = path.split( splitter );

        // If the splitter string occurs multiple times, we assume that the first occurance is the root of the repo.
        if ( splitPath.length > 1 ) {
            splitPath.shift();

            return splitPath.join(splitter);
        }
        else {
            return splitPath[1];
        }
    }
}

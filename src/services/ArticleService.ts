export default class ArticleService {
    constructor() {}

    getArticles() {
        return [
            {
                title: "First article",
                body: "Body of first article",
                author: "Author of first article"
            },
            {
                title: "Second article",
                body: "Body of second article",
                author: "Author of second article"
            }
        ];
    }
}
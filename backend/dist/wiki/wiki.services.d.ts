export declare class WikiService {
    private wikiArticles;
    findAll(): {
        message: string;
        articles: {
            id: string;
            title: string;
            category: string;
            content: string;
            author: string;
            created: Date;
            tags: string[];
        }[];
        count: number;
    };
    findOne(id: string): {
        id: string;
        title: string;
        category: string;
        content: string;
        author: string;
        created: Date;
        tags: string[];
    } | {
        error: string;
    };
    create(createWikiDto: any): {
        message: string;
        article: any;
    };
    getElektrotechnikTemplates(): {
        templates: {
            id: string;
            name: string;
            category: string;
            description: string;
            fields: ({
                name: string;
                type: string;
                label: string;
                required: boolean;
                fields?: undefined;
            } | {
                name: string;
                type: string;
                label: string;
                fields: ({
                    name: string;
                    type: string;
                    label: string;
                    options?: undefined;
                } | {
                    name: string;
                    type: string;
                    label: string;
                    options: string[];
                })[];
                required?: undefined;
            })[];
        }[];
    };
}

import { WikiService } from './wiki.service';
export declare class WikiController {
    private readonly wikiService;
    constructor(wikiService: WikiService);
    findAll(): any;
    findOne(id: string): any;
    create(createWikiDto: any): any;
    getTemplates(): any;
}

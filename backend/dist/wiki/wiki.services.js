"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikiService = void 0;
const common_1 = require("@nestjs/common");
let WikiService = class WikiService {
    constructor() {
        this.wikiArticles = [
            {
                id: '1',
                title: 'KNX Grundlagen',
                category: 'Gebäudeautomation',
                content: 'KNX ist ein offener Standard für die Gebäudeautomation...',
                author: 'Admin',
                created: new Date('2024-01-15'),
                tags: ['knx', 'grundlagen', 'gebäudeautomation']
            },
            {
                id: '2',
                title: 'Photovoltaik Installation',
                category: 'Erneuerbare Energien',
                content: 'Schritt-für-Schritt Anleitung zur PV-Installation...',
                author: 'Editor',
                created: new Date('2024-01-20'),
                tags: ['photovoltaik', 'installation', 'solar']
            }
        ];
    }
    findAll() {
        return {
            message: 'Wiki-Artikel für Fockenbrock Elektrotechnik',
            articles: this.wikiArticles,
            count: this.wikiArticles.length
        };
    }
    findOne(id) {
        const article = this.wikiArticles.find(a => a.id === id);
        return article || { error: 'Artikel nicht gefunden' };
    }
    create(createWikiDto) {
        const newArticle = Object.assign(Object.assign({ id: (this.wikiArticles.length + 1).toString() }, createWikiDto), { created: new Date(), author: 'Current User' });
        this.wikiArticles.push(newArticle);
        return { message: 'Artikel erstellt', article: newArticle };
    }
    getElektrotechnikTemplates() {
        return {
            templates: [
                {
                    id: 'verteilungslegende',
                    name: 'Verteilungslegende',
                    category: 'Elektrotechnik',
                    description: 'Dokumentation von Anlagenkomponenten',
                    fields: [
                        { name: 'projekt', type: 'text', label: 'Projekt', required: true },
                        { name: 'anlage', type: 'text', label: 'Anlage/Verteiler', required: true },
                        { name: 'stand', type: 'date', label: 'Stand (Datum)', required: true },
                        { name: 'komponenten', type: 'array', label: 'Komponenten',
                            fields: [
                                { name: 'bezeichnung', type: 'text', label: 'Bezeichnung' },
                                { name: 'typ', type: 'text', label: 'Typ' },
                                { name: 'polig', type: 'number', label: 'Polig' },
                                { name: 'ampere', type: 'number', label: 'Ampere' },
                                { name: 'bemerkung', type: 'text', label: 'Bemerkung' }
                            ]
                        }
                    ]
                },
                {
                    id: 'pruefprotokoll',
                    name: 'Prüfprotokoll',
                    category: 'Elektrotechnik',
                    description: 'Elektrische Messungen und Abnahmen',
                    fields: [
                        { name: 'objekt', type: 'text', label: 'Objekt', required: true },
                        { name: 'auftraggeber', type: 'text', label: 'Auftraggeber', required: true },
                        { name: 'pruefdatum', type: 'date', label: 'Prüfdatum', required: true },
                        { name: 'pruefer', type: 'text', label: 'Prüfer', required: true },
                        { name: 'messungen', type: 'array', label: 'Messungen',
                            fields: [
                                { name: 'messpunkt', type: 'text', label: 'Messpunkt' },
                                { name: 'messwert', type: 'number', label: 'Messwert' },
                                { name: 'sollwert', type: 'number', label: 'Sollwert' },
                                { name: 'einheit', type: 'text', label: 'Einheit' },
                                { name: 'ergebnis', type: 'select', label: 'Ergebnis', options: ['OK', 'NOK'] }
                            ]
                        }
                    ]
                },
                {
                    id: 'maengelbericht',
                    name: 'Mängelbericht',
                    category: 'Dokumentation',
                    description: 'Dokumentation von Fehlern und Nacharbeiten',
                    fields: [
                        { name: 'datum', type: 'date', label: 'Datum', required: true },
                        { name: 'kunde', type: 'text', label: 'Kunde', required: true },
                        { name: 'objekt', type: 'text', label: 'Objekt', required: true },
                        { name: 'pruefer', type: 'text', label: 'Prüfer', required: true },
                        { name: 'maengel', type: 'array', label: 'Mängel',
                            fields: [
                                { name: 'was', type: 'text', label: 'Was' },
                                { name: 'wo', type: 'text', label: 'Wo' },
                                { name: 'mangel', type: 'textarea', label: 'Mangel' },
                                { name: 'material', type: 'text', label: 'Material' },
                                { name: 'prioritaet', type: 'select', label: 'Priorität',
                                    options: ['niedrig', 'mittel', 'hoch'] }
                            ]
                        }
                    ]
                },
                {
                    id: 'klemmplan',
                    name: 'Klemmplan',
                    category: 'Elektrotechnik',
                    description: 'Verdrahtungspläne und Klemmenverbindungen',
                    fields: [
                        { name: 'anlage', type: 'text', label: 'Anlage', required: true },
                        { name: 'schaltschrank', type: 'text', label: 'Schaltschrank', required: true },
                        { name: 'klemmen', type: 'array', label: 'Klemmen',
                            fields: [
                                { name: 'klemme', type: 'text', label: 'Klemme' },
                                { name: 'bezeichnung', type: 'text', label: 'Bezeichnung' },
                                { name: 'von', type: 'text', label: 'Von' },
                                { name: 'nach', type: 'text', label: 'Nach' },
                                { name: 'querschnitt', type: 'text', label: 'Querschnitt' },
                                { name: 'farbe', type: 'text', label: 'Aderfarbe' }
                            ]
                        }
                    ]
                }
            ]
        };
    }
};
exports.WikiService = WikiService;
exports.WikiService = WikiService = __decorate([
    (0, common_1.Injectable)()
], WikiService);
//# sourceMappingURL=wiki.services.js.map
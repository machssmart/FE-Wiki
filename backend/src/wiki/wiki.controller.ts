import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WikiService } from './wiki.service';

@ApiTags('wiki')
@Controller('wiki')
export class WikiController {
  constructor(private readonly wikiService: WikiService) {}

  @ApiOperation({ summary: 'Alle Wiki-Artikel abrufen' })
  @Get()
  findAll() {
    return this.wikiService.findAll();
  }

  @ApiOperation({ summary: 'Wiki-Artikel nach ID abrufen' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wikiService.findOne(id);
  }

  @ApiOperation({ summary: 'Neuen Wiki-Artikel erstellen' })
  @Post()
  create(@Body() createWikiDto: any) {
    return this.wikiService.create(createWikiDto);
  }

  @ApiOperation({ summary: 'Elektrotechnik-Templates abrufen' })
  @Get('templates/all')
  getTemplates() {
    return this.wikiService.getElektrotechnikTemplates();
  }
}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContentService } from './content.service';
import { REGISTRY } from './registry';

@ApiTags('content')
@Controller()
export class ContentController {
  constructor(private readonly content: ContentService) {}

  /** Contenu complet du site — consommé par le site vitrine (public). */
  @Get('content')
  aggregate() {
    return this.content.getAggregate();
  }

  /** Registre : décrit les types de contenu et leurs champs (pilote le back-office). */
  @Get('content/schema')
  schema() {
    return REGISTRY;
  }

  // --------------------------------------------------------------- Admin
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin/singletons/:key')
  getSingleton(@Param('key') key: string) {
    return this.content.getSingleton(key);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('admin/singletons/:key')
  putSingleton(@Param('key') key: string, @Body() body: Record<string, unknown>) {
    return this.content.putSingleton(key, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin/collections/:key')
  listCollection(@Param('key') key: string) {
    return this.content.listCollection(key);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('admin/collections/:key')
  createEntry(@Param('key') key: string, @Body() body: Record<string, unknown>) {
    return this.content.createEntry(key, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('admin/collections/:key/reorder')
  reorder(@Param('key') key: string, @Body() body: { ids: string[] }) {
    return this.content.reorder(key, body?.ids ?? []);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('admin/collections/:key/:id')
  updateEntry(
    @Param('key') key: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.content.updateEntry(key, id, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('admin/collections/:key/:id')
  deleteEntry(@Param('key') key: string, @Param('id') id: string) {
    return this.content.deleteEntry(key, id);
  }
}

import { randomUUID } from 'crypto';
import { extname } from 'path';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MediaService } from './media.service';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'];

@ApiTags('media')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/media')
export class MediaController {
  constructor(private readonly media: MediaService) {}

  @Get()
  list() {
    return this.media.list();
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          cb(null, `${Date.now()}-${randomUUID().slice(0, 8)}${extname(file.originalname).toLowerCase()}`);
        },
      }),
      limits: { fileSize: 12 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED.includes(file.mimetype)) {
          return cb(new BadRequestException('Type de fichier non autorisé'), false);
        }
        cb(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File, @Body('alt') alt?: string) {
    if (!file) throw new BadRequestException('Aucun fichier reçu');
    return this.media.register(file, alt ?? '');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.media.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentEntry } from './entities/content-entry.entity';
import { Singleton } from './entities/singleton.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Singleton, ContentEntry])],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}

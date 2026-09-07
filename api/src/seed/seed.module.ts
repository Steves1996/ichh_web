import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntry } from '../content/entities/content-entry.entity';
import { Singleton } from '../content/entities/singleton.entity';
import { UsersModule } from '../users/users.module';
import { SeedService } from './seed.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Singleton, ContentEntry])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

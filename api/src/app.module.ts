import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { MailModule } from './mail/mail.module';
import { MediaModule } from './media/media.module';
import { PartnersModule } from './partners/partners.module';
import { SeedModule } from './seed/seed.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { UsersModule } from './users/users.module';
import { Singleton } from './content/entities/singleton.entity';
import { ContentEntry } from './content/entities/content-entry.entity';
import { MediaAsset } from './media/media-asset.entity';
import { PartnerRequest } from './partners/partner-request.entity';
import { Subscriber } from './subscribers/subscriber.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'ichh',
      entities: [Singleton, ContentEntry, MediaAsset, PartnerRequest, Subscriber, User],
      synchronize: (process.env.DB_SYNCHRONIZE ?? 'true') === 'true',
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    MailModule,
    UsersModule,
    AuthModule,
    ContentModule,
    MediaModule,
    PartnersModule,
    SubscribersModule,
    SeedModule,
  ],
})
export class AppModule {}

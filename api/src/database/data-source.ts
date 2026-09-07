import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Singleton } from '../content/entities/singleton.entity';
import { ContentEntry } from '../content/entities/content-entry.entity';
import { MediaAsset } from '../media/media-asset.entity';
import { PartnerRequest } from '../partners/partner-request.entity';
import { Registration } from '../registrations/registration.entity';
import { Subscriber } from '../subscribers/subscriber.entity';
import { User } from '../users/user.entity';

dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'ichh',
};

/** Utilisé uniquement par la CLI TypeORM (migrations). L'app utilise TypeOrmModule. */
export const AppDataSource = new DataSource({
  type: 'postgres',
  ...dbConfig,
  entities: [Singleton, ContentEntry, MediaAsset, PartnerRequest, Registration, Subscriber, User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

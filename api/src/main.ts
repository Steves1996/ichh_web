import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: false }),
  );

  const origins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins.length ? origins : true, credentials: true });

  const swagger = new DocumentBuilder()
    .setTitle('ICHH Yaoundé 2026 — API d’administration')
    .setDescription('Mise à jour des textes, images et contenus du site vitrine.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swagger));

  // Au premier démarrage : compte administrateur + contenu de référence si la base est vide
  const seed = app.get(SeedService);
  await seed.ensureAdminUser();
  await seed.ensureContentSeeded();

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`API ICHH prête sur http://localhost:${port}/api  (docs: /api/docs)`);
}

bootstrap();

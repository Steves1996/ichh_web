import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerRequest } from './partner-request.entity';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerRequest])],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}

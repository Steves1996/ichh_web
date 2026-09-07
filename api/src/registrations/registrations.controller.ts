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
import { CreateRegistrationDto, UpdateRegistrationDto } from './dto';
import { RegistrationsService } from './registrations.service';

@ApiTags('registrations')
@Controller()
export class RegistrationsController {
  constructor(private readonly registrations: RegistrationsService) {}

  /** Pré-inscription envoyée depuis le bouton « S'inscrire » du site — public. */
  @Post('registrations')
  create(@Body() dto: CreateRegistrationDto) {
    return this.registrations.create(dto);
  }

  // --------------------------------------------------------------- Admin
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin/registrations')
  list() {
    return this.registrations.list();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('admin/registrations/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRegistrationDto) {
    return this.registrations.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('admin/registrations/:id')
  remove(@Param('id') id: string) {
    return this.registrations.remove(id);
  }
}

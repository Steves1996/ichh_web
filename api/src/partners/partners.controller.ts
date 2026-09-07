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
import { CreatePartnerRequestDto, UpdatePartnerRequestDto } from './dto';
import { PartnersService } from './partners.service';

@ApiTags('partners')
@Controller()
export class PartnersController {
  constructor(private readonly partners: PartnersService) {}

  /** Envoi d'une demande depuis le site vitrine — public. */
  @Post('partner-requests')
  create(@Body() dto: CreatePartnerRequestDto) {
    return this.partners.create(dto);
  }

  // --------------------------------------------------------------- Admin
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin/partner-requests')
  list() {
    return this.partners.list();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('admin/partner-requests/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePartnerRequestDto) {
    return this.partners.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('admin/partner-requests/:id')
  remove(@Param('id') id: string) {
    return this.partners.remove(id);
  }
}

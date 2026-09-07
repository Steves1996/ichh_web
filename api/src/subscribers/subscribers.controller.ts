import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSubscriberDto } from './dto';
import { SubscribersService } from './subscribers.service';

@ApiTags('subscribers')
@Controller()
export class SubscribersController {
  constructor(private readonly subscribers: SubscribersService) {}

  /** Inscription à la lettre d'information depuis le site vitrine — public. */
  @Post('subscribers')
  subscribe(@Body() dto: CreateSubscriberDto) {
    return this.subscribers.subscribe(dto);
  }

  // --------------------------------------------------------------- Admin
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('admin/subscribers')
  list() {
    return this.subscribers.list();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('admin/subscribers/:id')
  remove(@Param('id') id: string) {
    return this.subscribers.remove(id);
  }
}

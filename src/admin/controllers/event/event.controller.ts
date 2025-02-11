import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';

import { eventDtoIn } from './event.dto';
import { AdminEventService } from './event.service';
import { Request } from 'express';

@Controller('admin')
export class AdminEventController {
  constructor(private readonly adminEventService: AdminEventService) {}

  @Post('/create-event')
  async createEvent(
    @Req() req: Request,
    @Body() event: eventDtoIn,
  ): Promise<void> {
    return await this.adminEventService.createEvent(req, event);
  }

  @Patch('/submit-presence/:status')
  async submitPresence(@Req() req: Request, @Param() param): Promise<void> {
    // return await this.adminEventService;
  }
}

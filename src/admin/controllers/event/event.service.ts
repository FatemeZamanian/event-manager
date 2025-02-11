import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import to from 'await-to-js';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { eventDtoIn } from './event.dto';
import { EventsEntity } from '../../../@orm/models/event/events.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';

@Injectable()
export class AdminEventService {
  constructor(
    private dataSource: DataSource,
    private readonly jwt: JwtService,
    @InjectRepository(EventsEntity)
    private repoEvents: Repository<EventsEntity>,
  ) {}

  public async createEvent(req: Request, event: eventDtoIn): Promise<void> {
    const adminId = (req as any).body.jwt.id;
    try {
      await to(
        this.repoEvents.save({
          adminId: adminId,
          title: event.title,
          description: event.description,
          registrationStartDate: event.registrationStartDate,
          registrationEndDate: event.registrationEndDate,
          startDate: event.startDate,
          endDate: event.endDate,
        }),
      );
    } catch (err) {
      throw new HttpException('internal server error ', HttpStatus.NOT_FOUND);
    } finally {
    }
  }
}

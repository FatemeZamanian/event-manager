import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { eventDtoIn } from './event.dto';
import { EventsEntity } from '../../../@orm/models/event/events.model';
import { Request } from 'express';
export declare class AdminEventService {
    private dataSource;
    private readonly jwt;
    private repoEvents;
    constructor(dataSource: DataSource, jwt: JwtService, repoEvents: Repository<EventsEntity>);
    createEvent(req: Request, event: eventDtoIn): Promise<void>;
}

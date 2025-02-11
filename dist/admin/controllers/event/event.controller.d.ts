import { eventDtoIn } from './event.dto';
import { AdminEventService } from './event.service';
import { Request } from 'express';
export declare class AdminEventController {
    private readonly adminEventService;
    constructor(adminEventService: AdminEventService);
    createEvent(req: Request, event: eventDtoIn): Promise<void>;
    submitPresence(req: Request, param: any): Promise<void>;
}

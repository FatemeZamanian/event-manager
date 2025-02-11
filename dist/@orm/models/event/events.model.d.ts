import { UsersEntity } from '../auth/users.model';
import { UsersWithEventsEntity } from './users-with-events.model';
export declare class EventsEntity {
    id: number;
    title: string;
    description: string;
    registrationStartDate: Date;
    registrationEndDate: Date;
    startDate: Date;
    endDate: Date;
    admin: UsersEntity;
    adminId: number;
    eventsWithUser: UsersWithEventsEntity[];
}

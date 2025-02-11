import { RolesEntity } from './roles.model';
import { EventsEntity } from '../event/events.model';
import { UsersWithEventsEntity } from '../event/users-with-events.model';
export declare class UsersEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    role: RolesEntity;
    roleId: number;
    event: EventsEntity[];
    eventsWithUser: UsersWithEventsEntity[];
}

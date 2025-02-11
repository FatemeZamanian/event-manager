import { PresenceStatus } from "../../consts";
import { EventsEntity } from "./events.model";
import { UsersEntity } from "../auth/users.model";
export declare class UsersWithEventsEntity {
    id: number;
    registrationDate: Date;
    presenceStatus: PresenceStatus;
    events: EventsEntity;
    eventId: number;
    user: UsersEntity;
    userId: number;
}

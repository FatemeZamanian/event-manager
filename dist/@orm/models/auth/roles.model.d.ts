import { RoleType } from "../../consts";
import { UsersEntity } from "./users.model";
export declare class RolesEntity {
    id: number;
    title: RoleType;
    users: UsersEntity[];
}

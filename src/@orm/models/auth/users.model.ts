import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolesEntity } from "./roles.model";
import { EventsEntity } from "../event/events.model";
import { UsersWithEventsEntity } from "../event/users-with-events.model";

@Entity({
  name: "users",
})
export class UsersEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "username", type: "varchar", nullable: false, unique: true })
  username: string;

  @Column({ name: "email", type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  //#########relations########

  @ManyToOne(() => RolesEntity, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: RolesEntity;

  @Column({ name: "role_id", type: "int", nullable: false })
  roleId: number;

  @OneToMany(() => EventsEntity, (event) => event.admin)
  event: EventsEntity[];

  @OneToMany(() => UsersWithEventsEntity, (uwe) => uwe.user)
  eventsWithUser: UsersWithEventsEntity[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UsersEntity } from "../auth/users.model";
import { UsersWithEventsEntity } from "./users-with-events.model";

@Entity({
  name: "events",
})
export class EventsEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "title", type: "varchar", nullable: false })
  title: string;

  @Column({ name: "description", type: "text", nullable: false })
  description: string;

  @Column({ name: "registration_start_date", type: "date", nullable: false })
  registrationStartDate: Date;

  @Column({ name: "registration_end_date", type: "date", nullable: false })
  registrationEndDate: Date;

  @Column({ name: "start_date", type: "date", nullable: false })
  startDate: Date;

  @Column({ name: "end_date", type: "date", nullable: false })
  endDate: Date;

  //#########relations########

  @ManyToOne(() => UsersEntity, (admin) => admin.event)
  @JoinColumn({ name: "admin_id" })
  admin: UsersEntity;

  @Column({ name: "admin_id", type: "int", nullable: false })
  adminId: number;

  @OneToMany(() => UsersWithEventsEntity, (uwe) => uwe.events)
  eventsWithUser: UsersWithEventsEntity[];
}

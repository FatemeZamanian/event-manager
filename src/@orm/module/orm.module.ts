import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsEntity } from "../models/event/events.model";
import { UsersEntity } from "../models/auth/users.model";
import { UsersWithEventsEntity } from "../models/event/users-with-events.model";
import { RolesEntity } from "../models/auth/roles.model";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "event_manager",
      entities: [EventsEntity, UsersEntity, UsersWithEventsEntity, RolesEntity],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([
      EventsEntity,
      UsersEntity,
      UsersWithEventsEntity,
      RolesEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class OrmModule {}

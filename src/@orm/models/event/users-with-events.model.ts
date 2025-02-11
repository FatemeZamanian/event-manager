import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PresenceStatus } from '../../consts';
import { EventsEntity } from './events.model';
import { UsersEntity } from '../auth/users.model';

@Entity({
  name: 'users-with-events',
})
export class UsersWithEventsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  registrationDate: Date;

  @Column({
    type: 'enum',
    nullable: false,
    enum: PresenceStatus,
    default: PresenceStatus.ABSENCE,
  })
  presenceStatus: PresenceStatus;

  //#########relations########

  @ManyToOne(() => EventsEntity, (event) => event.eventsWithUser)
  events: EventsEntity;

  @Column({ name: 'event_id', type: 'int', nullable: false })
  eventId: number;

  @ManyToOne(() => UsersEntity, (user) => user.eventsWithUser)
  user: UsersEntity;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;
}

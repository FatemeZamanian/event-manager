import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleType } from '../../consts';
import { UsersEntity } from './users.model';

@Entity({
  name: 'rols',
})
export class RolesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'title', type: 'enum', nullable: false, enum: RoleType })
  title: RoleType;

  //#########relations########

  @OneToMany(() => UsersEntity, (user) => user.role)
  users: UsersEntity[];
}

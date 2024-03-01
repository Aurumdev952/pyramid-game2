import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Rel,
} from '@mikro-orm/core';
import { Event } from '../../event/entities/event.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
  tableName: 'votes',
})
export class Vote {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @OneToOne()
  votedFor: User;

  @OneToOne()
  user: User;

  @ManyToOne(() => Event)
  event: Rel<Event>;

  @Property()
  dateCreated: Date = new Date();
}

import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Vote } from '../../vote/entities/vote.entity';

@Entity({
  tableName: 'events',
})
export class Event {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name: string;

  @Property({ default: false })
  isClosed: boolean;

  @OneToMany(() => Vote, (vote) => vote.event)
  votes = new Collection<Vote>(this);

  @Property()
  dateCreated: Date = new Date();

  @Property({ nullable: true })
  dateEnded: Date;
}

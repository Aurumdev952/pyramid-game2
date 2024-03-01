import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'users',
})
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  username: string;

  @Property({
    unique: true,
  })
  email!: string;

  @Property()
  password!: string;
}

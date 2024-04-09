import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  username: string;
}

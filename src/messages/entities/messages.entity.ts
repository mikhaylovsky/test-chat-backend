import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/users.entity';

@Entity('messages')
export class MessagesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity)
  user: UsersEntity;

  @Column({
    name: 'text',
    type: 'text',
    nullable: false,
  })
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}

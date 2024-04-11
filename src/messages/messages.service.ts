import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesEntity } from './entities';
import { CreateMessageDto } from './dtos';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entities';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * @param {CreateMessageDto} message
   * @returns Promise<MessagesEntity>
   */
  public async addMessage(message: CreateMessageDto): Promise<MessagesEntity> {
    try {
      const user: UsersEntity = await this.usersService.getUserById(
        message.userId,
      );

      const messageEntity: MessagesEntity = plainToInstance(MessagesEntity, {
        user,
        text: message.text,
      });

      return this.messagesRepository.save<MessagesEntity>(messageEntity);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @param {number} limit
   * @returns Promise<MessagesEntity[]>
   */
  public async getLastMessages(limit: number): Promise<MessagesEntity[]> {
    return this.messagesRepository
      .find({
        take: limit,
        order: {
          createdAt: 'desc',
        },
        relations: ['user'],
      })
      .then((messages: MessagesEntity[]) => messages.reverse());
  }
}

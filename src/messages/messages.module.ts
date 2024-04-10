import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './entities/messages.entity';
import { MessagesSocketGateway } from './messages-socket.gateway';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity, UsersEntity])],
  providers: [MessagesService, MessagesSocketGateway, UsersService],
  controllers: [MessagesController],
})
export class MessagesModule {}

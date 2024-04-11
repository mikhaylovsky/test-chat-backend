import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './entities';
import { MessagesSocketGateway } from './messages-socket.gateway';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity, UsersEntity])],
  providers: [MessagesService, MessagesSocketGateway, UsersService],
  controllers: [MessagesController],
})
export class MessagesModule {}

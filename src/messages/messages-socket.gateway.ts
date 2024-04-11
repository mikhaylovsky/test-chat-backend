import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos';
import { MessagesEntity } from './entities';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/entities';
import { randomUUID } from 'crypto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly userService: UsersService,
  ) {}

  /**
   * @param {Socket} client
   * @returns Promise<void>
   */
  async handleConnection(client: Socket): Promise<void> {
    try {
      const user: UsersEntity = await this.userService.getUserById(
        client.handshake.auth.userId,
      );

      this.server.emit('client-connected', {
        id: randomUUID(),
        user,
        createdAt: new Date(),
        onlineUsers: this.server.engine.clientsCount,
      });
    } catch (error) {
      console.log(error);
      this.server.disconnectSockets();
    }
  }

  /**
   * @param {Socket} client
   * @returns Promise<void>
   */
  async handleDisconnect(client: Socket): Promise<void> {
    try {
      const user: UsersEntity = await this.userService.getUserById(
        client.handshake.auth.userId,
      );

      this.server.emit('client-disconnected', {
        id: randomUUID(),
        user,
        createdAt: new Date(),
        onlineUsers: this.server.engine.clientsCount,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('message-sent')
  async handleEvent(@MessageBody() message: CreateMessageDto): Promise<void> {
    const messageEntity: MessagesEntity =
      await this.messagesService.addMessage(message);

    if (messageEntity) {
      this.server.emit('message-added', messageEntity);
    }
  }
}

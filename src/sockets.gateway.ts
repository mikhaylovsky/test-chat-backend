import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { randomUUID } from 'crypto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  handleConnection(client: any, ...args): any {
    console.log('CONNECTED');
  }

  handleDisconnect(client: any): any {
    console.log('DISCONNECTED');
  }

  @SubscribeMessage('test-socket-emit')
  handleEvent(@MessageBody() data: any) {
    this.server.emit('test-socket-receive', {
      id: randomUUID(),
      user: data.user,
      message: data.message,
      date: new Date(),
    });
  }
}

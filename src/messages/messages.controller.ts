import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesEntity } from './entities/messages.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  public async getMessages(
    @Query('limit') limit: number,
  ): Promise<MessagesEntity[]> {
    return this.messagesService.getLastMessages(limit);
  }
}

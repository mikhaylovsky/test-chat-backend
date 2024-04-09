import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(public readonly usersService: UsersService) {}

  @Post('create')
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.getUserByUsername(loginUserDto.username);
  }
}

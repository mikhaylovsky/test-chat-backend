import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const userEntity: UsersEntity = plainToInstance<UsersEntity, CreateUserDto>(
      UsersEntity,
      createUserDto,
    );
    return this.usersRepository.save(userEntity);
  }

  public async getUserByUsername(username: string): Promise<UsersEntity> {
    return this.usersRepository
      .findOne({
        where: {
          username,
        },
      })
      .then((user: UsersEntity) => {
        if (!user) {
          throw new NotFoundException(
            `User with username ${username} is not found!`,
          );
        }

        return user;
      });
  }
}

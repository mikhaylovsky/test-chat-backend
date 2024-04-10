import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  public static readonly PgIntegrityConstraintUniqueViolationErrorCode =
    '23505';

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const userEntity: UsersEntity = plainToInstance<UsersEntity, CreateUserDto>(
      UsersEntity,
      createUserDto,
    );

    return this.usersRepository.save(userEntity).catch((error) => {
      if (
        error &&
        error.code ===
          UsersService.PgIntegrityConstraintUniqueViolationErrorCode
      ) {
        throw new UnprocessableEntityException(
          `User with name ${createUserDto.username} is already registered!`,
        );
      }

      console.error(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please, try again later',
      );
    });
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
            `User with username ${username} was not found!`,
          );
        }

        return user;
      });
  }

  public async getUserById(id: string): Promise<UsersEntity> {
    return this.usersRepository
      .findOne({
        where: {
          id,
        },
      })
      .then((user: UsersEntity) => {
        if (!user) {
          throw new NotFoundException(`User with id ${id} was not found!`);
        }

        return user;
      });
  }
}

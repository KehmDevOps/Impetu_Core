import { HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemConstants } from '../../constants/system.constants';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../../constants/systemErrorCodes.constants';
import { QueryI } from '../../interfaces/query.interface';
import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../../dtos/responses/user/user.response';
import { UserRequest } from '../../dtos/requests/user.request';
import * as crypto from 'crypto';
import { GenericResponse } from '../../dtos/responses/generic/generic.response';
import { RolesService } from '../../services/roles/roles.service';
import { Role } from '../../domain/roles.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, SystemConstants.IMPETU_DB)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService
  ) {}

  public async find(query: QueryI<User>): Promise<User[]> {
    return await this.userRepository.find(query);
  }

  public async findOne(query: QueryI<User>): Promise<User | null> {
    return await this.userRepository.findOne(query);
  }

  public async findAll(): Promise<UserResponse[]> {
    const users: User[] = await this.userRepository.find({
      relations: {
        role: true,
      }
    });

    return plainToInstance(UserResponse, users, { excludeExtraneousValues: true });
  }

  public async findUser(id: number){
    const user: User | null = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        role: true,
      }
    });

    if (!user) {
      throw new NotFoundException(SystemErrorMessages.UserNotFound, SystemErrorCodes.UserNotFound);
    }

    return plainToInstance(UserResponse, user, { excludeExtraneousValues: true });
  }

  public async createUser(request: UserRequest){
    const role: Role | null = await this.roleService.findOne({ where: { id: request.roleId, status: true } });

    if (!role) {
      throw new NotAcceptableException(SystemErrorMessages.InvalidRole, SystemErrorCodes.InvalidRole);
    }

    const hashedPassword = crypto.createHash('sha256')
      .update(request.password, 'utf8').digest();

    const user: User = this.userRepository.create({
      userName: request.username,
      firstName: request.firstName,
      lastName: request.lastName,
      surName: request.surName,
      password: hashedPassword,
      roleId: request.roleId,
      status: true,
      salary: 0
    });

    await this.userRepository.save(user);

    return new GenericResponse(HttpStatus.CREATED, SystemErrorMessages.UserCreated);
  }
}

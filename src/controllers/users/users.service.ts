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
import { PageableResponse } from '../../dtos/responses/pageable-response';
import { Order } from '../../enums/order.enum';
import { ObjectMapper } from '../../helpers/object-mapper.helper';
import { UserQueryTemplates } from '../../helpers/query-templates/user.query-template';

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

  public async findUsersByFilter(page: number, limit: number, order: string, filter: string): Promise<PageableResponse> {
    const filterParam = `%${filter}%`;
    const orderDirection = order ? Order[order] : Order.DESC;
    const offset = (page - 1) * limit;

    const results = await this.userRepository.query(
      UserQueryTemplates.findUsersByFilter(orderDirection),
      [filterParam, offset, limit]
    );

    if (results.length === 0) {
      return new PageableResponse([], 0, 0, Number(page));
    }

    const total = parseInt(results[0].total, 10);
    const totalPages = Math.ceil(total / limit);

    const usersResponse: UserResponse[] = ObjectMapper.toUserResponseList(results);

    return new PageableResponse(usersResponse, total, totalPages, Number(page));
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

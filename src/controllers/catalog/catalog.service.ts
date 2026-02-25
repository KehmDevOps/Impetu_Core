import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RolesService } from '../../services/roles/roles.service';
import { plainToInstance } from 'class-transformer';
import { RoleResponse } from '../../dtos/responses/role/role.response';
import { Role } from '../../domain/roles.entity';
import { RoleRequest } from '../../dtos/requests/role.request';
import { GenericResponse } from '../../dtos/responses/generic/generic.response';
import { SystemErrorCodes } from '../../constants/systemErrorCodes.constants';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';
import { SystemMessages } from '../../constants/systemMessages.constants';
import { DisciplineResponse } from '../../dtos/responses/discipline/discipline.response';
import { Discipline } from '../../domain/discipline.entity';
import { MembershipDetailsService } from '../../services/membership-details/membership-details.service';
import { MembershipDetails } from '../../domain/membership-details.entity';
import { MembershipDetailsResponse } from '../../dtos/responses/membership-details/membership-details.response';
import { SystemConstants } from '../../constants/system.constants';
import { Not, In } from 'typeorm';
import { ParentsService } from '../../services/parents/parents.service';
import { ParentsResponse } from '../../dtos/responses/parents/parents.response';
import { Parents } from '../../domain/parents.entity';
import { DisciplineService } from '../../services/disciplines/discipline.service';

@Injectable()
export class CatalogService {
  constructor(
    private roleService: RolesService,
    private disciplinesService: DisciplineService,
    private membershipDetailsService: MembershipDetailsService,
    private parentsService: ParentsService
  ) {}

  public async findAllRoles(){
    const roles: Role[] = await this.roleService.find({ where : { status: true } });
    return plainToInstance(RoleResponse, roles, { excludeExtraneousValues: true });
  }

  public async createRole(body: RoleRequest){
    const alreadyExist: Role | null = await this.roleService.findOne({ where: { name: body.name } });

    if (alreadyExist) {
      throw new BadRequestException(SystemErrorMessages.RoleAlreadyExist, SystemErrorCodes.RoleAlreadyExist);
    }

    const role: Role = await this.roleService.persist(body);
    await this.roleService.save(role);

    return new GenericResponse(HttpStatus.CREATED, SystemMessages.RoleCreated);
  }

  public async getMembershipDetailsByDiscipline(disciplineId: number){
    const membershipDetails: MembershipDetails[] =
      await this.membershipDetailsService.find({
        where: {
          status: true,
          disciplineId: disciplineId,
          name: Not(In(SystemConstants.EXCLUDED_MEMBERSHIP_DETAILS.GYM_BOX)),
        },
      });

    return plainToInstance(MembershipDetailsResponse, membershipDetails, { excludeExtraneousValues: true });
  }

  public async getDisciplines(): Promise<DisciplineResponse[]> {
    const disciplines: Discipline [] = await this.disciplinesService.find({ where: { status: true } });
    return plainToInstance(DisciplineResponse, disciplines, { excludeExtraneousValues: true });
  }

  public async getParents(): Promise<ParentsResponse[]> {
    const parents: Parents[] = await this.parentsService.find({});
    return plainToInstance(ParentsResponse, parents, { excludeExtraneousValues: true });
  }
}

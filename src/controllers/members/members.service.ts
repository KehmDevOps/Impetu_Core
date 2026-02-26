import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from '../../domain/members.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';
import { MemberRequest } from '../../dtos/requests/member.request';
import { randomUUID } from 'crypto';
import { EvolutionService } from '../../services/evolution/evolution.service';
import { DateHelper } from '../../helpers/date.helper';
import { MembershipsService } from '../../services/memberships/memberships.service';
import { Membership } from '../../domain/membership.entity';
import { TemplateMessages } from '../../constants/template-messages.constants';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members, SystemConstants.IMPETU_DB)
    private readonly membersRepository: Repository<Members>,
    private readonly membershipsService: MembershipsService,
    private readonly evolutionService: EvolutionService,
  ) {}

  public async find(query: QueryI<Members>): Promise<Members[]> {
    return await this.membersRepository.find(query);
  }

  public async findOne(query: QueryI<Members>): Promise<Members | null> {
    return await this.membersRepository.findOne(query);
  }

  public async save(members: Members): Promise<Members> {
    return await this.membersRepository.save(members);
  }

  public async persist(request: MemberRequest): Promise<Members> {
    const guid = randomUUID();

    return this.membersRepository.create({
      firstName: request.firstName.toUpperCase().trim(),
      lastName: request.lastName.toUpperCase().trim(),
      surName: request.surName.toUpperCase().trim(),
      gender: request.gender,
      bornDate: request.bornDate,
      age: DateHelper.calculateAge(request.bornDate),
      address: request.address.toUpperCase().trim(),
      personalPhone: request.personalPhone,
      emergencyPhone: request.emergencyPhone,
      token: guid,
      parentId: request.parentId,
      membershipDetailsId: request.membershipDetailsId
    });
  }

  public async createNewMember(body: MemberRequest, userId: number){
    const newMember: Members = await this.save(await this.persist(body));
    const membership: Membership = await this.membershipsService.persist(newMember.token, userId, newMember.id);
    await this.membershipsService.save(membership);
    this.sendQR(newMember);
  }

  private sendQR(member: Members): void{
    const message: string = TemplateMessages.WELCOME(member.firstName, member.gender);
    this.evolutionService.sendWhatsAppImage(member.personalPhone, message, member.token)
      .then((response: any): void => {
        if(response.error){
          console.log('Error in response');
          return;
        }

        console.log('Message send successfully');
      })
      .catch((error: any): void => {
        console.log('Error in catch');
        console.log(error, null, 2);
      });
  }
}

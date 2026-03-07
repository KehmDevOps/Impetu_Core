import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { MembersService } from './members.service';
import { Auth } from '../../decorators/auth.decorator';
import { MemberRequest } from '../../dtos/requests/member.request';
import { PaginationOptions } from '../../dtos/requests/pagination-options';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @Auth()
  public async createMember(@Body() body: MemberRequest, @Req() req: Request){
    await this.membersService.createNewMember(body, req['user'].identifier);
  }

  @Get()
  @Auth()
  public async searchMember (@Query() query: PaginationOptions){
    return await this.membersService.findMembersByFilter(query.page, query.limit, query.order, query.filter)
  }

  @Get(':id/full-profile')
  @Auth()
  public async getFullMemberProfile(@Param('id') id: number){
    return await this.membersService.getFullMemberProfile(id);
  }
}

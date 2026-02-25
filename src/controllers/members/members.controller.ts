import { Body, Controller, Post, Req } from '@nestjs/common';
import { MembersService } from './members.service';
import { Auth } from '../../decorators/auth.decorator';
import { MemberRequest } from '../../dtos/requests/member.request';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @Auth()
  public async createMember(@Body() body: MemberRequest, @Req() req: Request){
    await this.membersService.createNewMember(body, req['user'].identifier);
  }
}

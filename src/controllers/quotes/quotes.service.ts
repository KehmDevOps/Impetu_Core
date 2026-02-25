import { Injectable, NotFoundException } from '@nestjs/common';
import { MembershipDetailsService } from '../../services/membership-details/membership-details.service';
import { NewMemberQuoteRequest } from '../../dtos/requests/new-member-quote.request';
import { SystemErrorMessages } from '../../constants/systemErrorMessages.constants';
import { SystemErrorCodes } from '../../constants/systemErrorCodes.constants';
import { ObjectMapper } from '../../helpers/object-mapper.helper';
import { NewMemberQuoteResponse } from '../../dtos/responses/new-member-quote.response';
import { MembershipDetails } from '../../domain/membership-details.entity';

@Injectable()
export class QuotesService {
  constructor(
    private readonly membershipDetailsService: MembershipDetailsService,
  ) {}

  public async quoteForNewMember(request: NewMemberQuoteRequest): Promise<NewMemberQuoteResponse> {
    const membershipDetails: MembershipDetails | null = await this.membershipDetailsService.findOne({
      where: { id: request.membershipDetailsId },
    });

    if (!membershipDetails) {
      throw new NotFoundException(SystemErrorMessages.MembershipDetailsNotFound, SystemErrorCodes.MembershipDetailsNotFound);
    }

    if(request.discountCode || request.discountCode?.length){
      //TODO: Return response with discount
      console.log('Se aplicará descuento chipon');
    }

    return ObjectMapper.toNewMemberQuote(membershipDetails);
  }
}

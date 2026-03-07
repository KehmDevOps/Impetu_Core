import { Expose, Type } from 'class-transformer';
import { PersonalDataDto } from './personal-data.dto';
import { GymMembershipDto } from './gym-membership.dto';
import { BoxMembershipDto } from './box-membership.dto';
import { PaymentsHistoryDto } from './payments-history.dto';

export class FullMemberProfileResponse {
  @Expose()
  @Type(() => PersonalDataDto)
  personalData: PersonalDataDto;

  @Expose()
  @Type(() => GymMembershipDto)
  gymMembership?: GymMembershipDto;

  @Expose()
  @Type(() => BoxMembershipDto)
  boxMembership?: BoxMembershipDto;

  @Expose()
  @Type(() => PaymentsHistoryDto)
  payments: PaymentsHistoryDto;
}
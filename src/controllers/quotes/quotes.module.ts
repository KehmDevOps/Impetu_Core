import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { MembershipDetailsModule } from '../../services/membership-details/membership-details.module';

@Module({
  imports: [MembershipDetailsModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}

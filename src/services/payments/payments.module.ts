import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from '../../domain/payments.entity';
import { PaymentsService } from './payments.service';
import { SystemConstants } from '../../constants/system.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Payments], SystemConstants.IMPETU_DB)],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}

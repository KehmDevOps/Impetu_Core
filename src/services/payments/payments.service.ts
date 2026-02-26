import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payments } from '../../domain/payments.entity';
import { QueryI } from '../../interfaces/query.interface';
import { SystemConstants } from '../../constants/system.constants';
import { PaymentI } from '../../interfaces/models/payment.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments, SystemConstants.IMPETU_DB)
    private readonly paymentsRepository: Repository<Payments>,
  ) {}

  public async find(query: QueryI<Payments>): Promise<Payments[]> {
    return await this.paymentsRepository.find(query);
  }

  public async findOne(query: QueryI<Payments>): Promise<Payments | null> {
    return await this.paymentsRepository.findOne(query);
  }

  public async save(payments: Payments): Promise<Payments> {
    return await this.paymentsRepository.save(payments);
  }

  public async persist(paymentDetails: PaymentI): Promise<Payments> {
    const today: Date = new Date();
    return this.paymentsRepository.create({
      paymentDate: today,
      concept: paymentDetails.concept,
      amount: paymentDetails.discountAmount ?? paymentDetails.amount,
      memberId: paymentDetails.memberId,
      disciplineId: paymentDetails.disciplineId,
      status: true,
      conceptExtraInformation: paymentDetails.extraInformation,
      createdBy: paymentDetails.userId,
      discountCouponId: paymentDetails.discountId
    });
  }
}

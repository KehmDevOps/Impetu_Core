import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Members } from './members.entity';
import { User } from './user.entity';
import { Discipline } from './discipline.entity';

@Entity('payments')
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'payment_date', type: 'datetime2', precision: 3 })
  paymentDate: Date;

  @Column({ type: 'varchar', length: 100 })
  concept: string;

  @Column({ type: 'money' })
  amount: number;

  @Column({ name: 'member_id', type: 'int', nullable: true })
  memberId: number;

  @ManyToOne(() => Members)
  @JoinColumn({ name: 'member_id' })
  member: Members;

  @Column({ name: 'created_by', type: 'int', default: 1 })
  createdBy: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({ type: 'bit', default: 1 })
  status: boolean;

  @Column({ name: 'deleted_at', type: 'datetime2', precision: 3, nullable: true })
  deletedAt: Date;

  @Column({ name: 'deleted_by', type: 'int', nullable: true })
  deletedBy: number;

  @Column({ name: 'discount_coupon_id', type: 'int', nullable: true })
  discountCouponId: number | null;

  @Column({ name: 'discipline_id', type: 'int', default: 1 })
  disciplineId: number;

  @ManyToOne(() => Discipline)
  @JoinColumn({ name: 'discipline_id' })
  discipline: Discipline;

  @Column({ name: 'concept_extra_information', type: 'varchar', length: 200, default: 'SOLO GYM' })
  conceptExtraInformation: string;
}

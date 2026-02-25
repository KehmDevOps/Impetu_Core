import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Members } from './members.entity';
import { MembershipStatus } from './membership-status.entity';

@Entity('membership')
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', type: 'datetime2', precision: 3 })
  createdAt: Date;

  @Column({ type: 'int' })
  status: number;

  @ManyToOne(() => MembershipStatus)
  @JoinColumn({ name: 'status' })
  membershipStatus: MembershipStatus;

  @Column({ name: 'initial_date', type: 'date' })
  initialDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'expired_days', type: 'int' })
  expiredDays: number;

  @Column({ name: 'promotion_months', type: 'int' })
  promotionMonths: number;

  @Column({ name: 'total_renews', type: 'int' })
  totalRenews: number;

  @Column({ type: 'int' })
  assistances: number;

  @Column({ name: 'is_promo', type: 'bit' })
  isPromo: boolean;

  @Column({ type: 'varchar', length: 120 })
  token: string;

  @Column({ name: 'promotion_name', type: 'varchar', length: 30, nullable: true })
  promotionName: string;

  @Column({ name: 'free_month', type: 'bit', nullable: true })
  freeMonth: boolean;

  @Column({ name: 'remaining_accesses', type: 'int', default: 0 })
  remainingAccesses: number;

  @Column({ name: 'created_by', type: 'int', default: 1 })
  createdBy: number;

  @Column({ name: 'member_id', type: 'int', nullable: true })
  memberId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @ManyToOne(() => Members)
  @JoinColumn({ name: 'member_id' })
  member: Members;
}

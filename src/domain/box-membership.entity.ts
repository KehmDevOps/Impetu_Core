import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Members } from './members.entity';
import { MembershipStatus } from './membership-status.entity';

@Entity('box_membership')
export class BoxMembership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id', type: 'int' })
  memberId: number;

  @ManyToOne(() => Members)
  @JoinColumn({ name: 'member_id' })
  member: Members;

  @Column({ name: 'membership_status_id', type: 'int' })
  membershipStatusId: number;

  @ManyToOne(() => MembershipStatus)
  @JoinColumn({ name: 'membership_status_id' })
  membershipStatus: MembershipStatus;

  @Column({ name: 'intital_date', type: 'datetime2', precision: 3 })
  initialDate: Date;

  @Column({ name: 'end_date', type: 'datetime2', precision: 3 })
  endDate: Date;

  @Column({ name: 'expired_days', type: 'int', default: 0 })
  expiredDays: number;

  @Column({ name: 'remaining_accesses', type: 'int' })
  remainingAccesses: number;

  @Column({ type: 'varchar', length: 255 })
  token: string;

  @Column({ name: 'created_by', type: 'int' })
  createdBy: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;
}

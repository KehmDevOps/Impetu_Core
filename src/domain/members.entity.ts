import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Parents } from './parents.entity';
import { MembershipDetails } from './membership-details.entity';

@Entity('members')
export class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 40 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ name: 'sur_name', type: 'varchar', length: 50, nullable: true })
  surName: string;

  @Column({ type: 'varchar', length: 15 })
  gender: string;

  @Column({ name: 'born_date', type: 'date', nullable: true })
  bornDate: Date;

  @Column({ type: 'smallint', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  address: string;

  @Column({ name: 'personal_phone', type: 'varchar', length: 30, nullable: true })
  personalPhone: string;

  @Column({ name: 'emergency_phone', type: 'varchar', length: 30, nullable: true })
  emergencyPhone: string;

  @Column({ name: 'parent_id', type: 'int' })
  parentId: number;

  @ManyToOne(() => Parents)
  @JoinColumn({ name: 'parent_id' })
  parent: Parents;

  @Column({ type: 'varchar', length: 120, nullable: true })
  token: string;

  @Column({ name: 'membership_details_id', type: 'int' })
  membershipDetailsId: number;

  @ManyToOne(() => MembershipDetails)
  @JoinColumn({ name: 'membership_details_id' })
  membershipDetails: MembershipDetails;
}

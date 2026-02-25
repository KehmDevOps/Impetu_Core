import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('membership_status')
export class MembershipStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;
}

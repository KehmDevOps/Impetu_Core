import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Discipline } from './discipline.entity';

@Entity('membership_details')
export class MembershipDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25 })
  name: string;

  @Column({ type: 'money' })
  price: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  description: string;

  @Column({ type: 'bit', default: 1 })
  status: boolean;

  @Column({ name: 'total_accesses', type: 'int', default: 0 })
  totalAccesses: number;

  @Column({ name: 'created_at', type: 'datetime2', precision: 3, default: () => 'SYSDATETIME()' })
  createdAt: Date;

  @Column({ name: 'discipline_id', type: 'int', default: 1 })
  disciplineId: number;

  @ManyToOne(() => Discipline)
  @JoinColumn({ name: 'discipline_id' })
  discipline: Discipline;
}

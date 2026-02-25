import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discipline')
export class Discipline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'bit' })
  status: boolean;

  @Column({ name: 'created_at', type: 'datetime2', precision: 3, default: (): string => 'DATETIME()' })
  createdAt: Date;
}

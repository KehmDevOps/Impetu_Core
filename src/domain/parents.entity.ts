import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parents')
export class Parents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  description: string;
}

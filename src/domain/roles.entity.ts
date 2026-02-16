import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export abstract class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', type: 'varchar', length: 80 })
  name!: string;

  @Column({ name: 'description', type: 'varchar', length: 120 })
  description!: string;

  @Column({ name: 'status', type: 'bit', default: 1 })
  status: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'datetime2', precision: 3 })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime2', precision: 3 })
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

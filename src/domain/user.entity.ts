import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Role } from './roles.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_name', type: 'varchar', length: 255 })
  userName!: string;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ name: 'sur_name', type: 'varchar', length: 100 })
  surName!: string;

  @Column({ name: 'secret_pass', type: 'varbinary', length: 64 })
  password!: Buffer;

  @Column({ type: 'bit', default: 1 })
  status!: boolean;

  @ManyToOne(() => Role, (role) => role.id, { eager: false })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Column({ name: 'role_id', type: 'int' })
  roleId!: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime2', precision: 3 })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime2', precision: 3 })
  updatedAt!: Date;
}

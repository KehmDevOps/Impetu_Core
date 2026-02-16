import { Expose } from 'class-transformer';

export class RoleResponse {
  @Expose({ name: 'id' })
  identifier!: number;

  @Expose({name: 'description'})
  roleDescription!: string;
}

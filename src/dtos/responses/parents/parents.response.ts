import { Expose } from 'class-transformer';

export class ParentsResponse {
  @Expose({ name: 'id' })
  identifier: number;

  @Expose()
  name: string;
}

import { Expose } from 'class-transformer';

export class DisciplineResponse {
  @Expose({ name: 'id' })
  identifier: number;

  @Expose()
  name: string;
}

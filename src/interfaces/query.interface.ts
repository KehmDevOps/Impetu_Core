import {
  FindOptionsOrder,
  FindOptionsRelations, FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';

export interface QueryI<T>{
  where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  relations?: FindOptionsRelations<T>;
  order?: FindOptionsOrder<T>;
  select?: FindOptionsSelect<T>;
  skip?: number;
  take?: number;
}
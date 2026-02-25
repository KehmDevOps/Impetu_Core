export interface ApiI {
  url: string;
  token?: string;
  data?: object;
  additionalHeaders?: Record<string, string>;
  authorizationType?: 'basic' | 'bearer';
  params?: Record<string, string>;
}

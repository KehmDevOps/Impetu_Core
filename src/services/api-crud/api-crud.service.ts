import { Injectable } from '@nestjs/common';
import { ApiI } from '../../interfaces/api.interface';

@Injectable()
export class ApiCrud {
  private headerConfiguration(
    token?: string,
    noContentType?: any,
    additionalHeaders?: Record<string, string>,
    authorizationType?: 'basic' | 'bearer',
  ) {
    const headers: any = {};

    if (!noContentType) {
      headers['Accept'] = 'application/json';
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      if (authorizationType === 'basic') {
        headers['Authorization'] = `Basic ${token}`;
      } else {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    if (additionalHeaders) {
      Object.assign(headers, additionalHeaders);
    }

    return { headers };
  }

  public async post<T = unknown>({
    url,
    data,
    token,
    additionalHeaders,
    authorizationType,
  }: ApiI): Promise<T> {
    const response: Response = await fetch(url, {
      method: 'POST',
      headers: this.headerConfiguration(
        token,
        false,
        additionalHeaders,
        authorizationType,
      ).headers,
      body: JSON.stringify(data),
    });
    return (await response.json()) as T;
  }
}

export class GenericResponse {
  constructor(statusCode: number, message: string, extra?: any) {
    this.statusCode = statusCode;
    this.message = message;
    if (extra) {
      this.extra = extra;
    }
  }
  public statusCode: number;
  public message: string;
  public extra?: any;
}

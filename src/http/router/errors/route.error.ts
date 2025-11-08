export interface RouteErrorParams {
  message: string;
  statusCode: number;
}

export class RouteError extends Error {
  readonly code: number;

  constructor({ message, statusCode }: RouteErrorParams) {
    super(message);
    this.code = statusCode;
  }

  public toResponse(): { statusCode: number; statusMessage: string } {
    return {
      statusCode: this.code,
      statusMessage: this.message,
    };
  }
}

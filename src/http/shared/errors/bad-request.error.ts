import { RouteError } from '@http/router';

export class BadRequestError extends RouteError {
  constructor(message: string) {
    super({
      message,
      statusCode: 400,
    });
  }
}

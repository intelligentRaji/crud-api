import { RouteError } from './route.error';

export class BadRequestError extends RouteError {
  constructor(message: string) {
    super({
      message,
      statusCode: 400,
    });
  }
}

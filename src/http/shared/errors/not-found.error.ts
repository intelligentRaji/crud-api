import { RouteError } from '../../shared/errors/route.error';

export class NotFoundError extends RouteError {
  constructor(message: string) {
    super({ message, statusCode: 404 });
  }
}

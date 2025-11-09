export class DIError extends Error {
  constructor(message: string) {
    super(`DI Error: ${message}`);
    this.name = 'DiError';
  }
}

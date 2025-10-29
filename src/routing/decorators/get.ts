import { res } from '../tokens';
import { Handler } from './handler';

export function Get(path: string = '') {
  const transformFn = (descriptor: PropertyDescriptor) => {
    const originalFn = descriptor.value;

    descriptor.value = function (...args: any[]): void {
      const body = JSON.stringify(originalFn.apply(this, args));
      const response = res();

      response.write(body);
      response.end();
    };
  };

  return Handler('GET', path, transformFn);
}

import { Handler } from './handler';

export function Put(path: string = '') {
  return Handler('PUT', path);
}

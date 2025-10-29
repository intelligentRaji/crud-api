import { Handler } from './handler';

export function Get(path: string = '') {
  return Handler('GET', path);
}

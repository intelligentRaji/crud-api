import { Handler } from './handler';

export function Post(path: string = '') {
  return Handler('POST', path);
}

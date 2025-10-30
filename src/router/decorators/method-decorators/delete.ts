import { Handler } from './handler';

export function Delete(path: string = '') {
  return Handler('DELETE', path);
}

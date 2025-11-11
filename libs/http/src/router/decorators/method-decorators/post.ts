import { Route } from './route';

export function Post(path: string = '') {
  return Route('POST', path);
}

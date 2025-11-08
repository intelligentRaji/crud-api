import { Route } from './route';

export function Put(path: string = '') {
  return Route('PUT', path);
}

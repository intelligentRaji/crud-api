import { Route } from './route';

export function Get(path: string = '') {
  return Route('GET', path);
}

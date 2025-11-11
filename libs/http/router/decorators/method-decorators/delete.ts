import { Route } from './route';

export function Delete(path: string = '') {
  return Route('DELETE', path);
}

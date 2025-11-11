import { Injector } from './injector';

let currentInjector = new Injector();

export function setCurrentInjector(injector: Injector): void {
  currentInjector = injector;
}

export function getCurrentInjector(): Injector {
  return currentInjector;
}

export async function runInInjectionContext<T>(callback: () => T, injector: Injector): Promise<T> {
  const previousInjector = getCurrentInjector();

  setCurrentInjector(injector);
  const result = await callback();
  setCurrentInjector(previousInjector);

  return result;
}

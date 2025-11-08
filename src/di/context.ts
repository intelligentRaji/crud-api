import { Injector } from './injector';

let currentInjector = new Injector();

export function setCurrentInjector(injector: Injector): void {
  currentInjector = injector;
}

export function getCurrentInjector(): Injector {
  return currentInjector;
}

export function runInInjectionContext<T>(callback: () => T, injector: Injector): T {
  const previousInjector = getCurrentInjector();

  setCurrentInjector(injector);
  const result = callback();
  setCurrentInjector(previousInjector);

  return result;
}

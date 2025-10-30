import { Injector } from './injector';

let currentInjector = new Injector();

export function setCurrentInjector(injector: Injector): void {
  currentInjector = injector;
}

export function getCurrentInjector(): Injector {
  return currentInjector;
}

export function runInInjectorContext<T>(callback: () => T, injector: Injector): T {
  setCurrentInjector(injector);
  const result = callback();
  setCurrentInjector(injector);

  return result;
}

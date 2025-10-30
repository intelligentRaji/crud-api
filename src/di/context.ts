import { Injector } from './injector';

let currentInjector = new Injector();

export function setCurrentInjector(injector: Injector): void {
  currentInjector = injector;
}

export function getCurrentInjector(): Injector {
  return currentInjector;
}

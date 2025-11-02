export function defineMetadata(metadata: any, target: any): void {
  target['__metadata'] = metadata;
}

export function getMetadata(target: any): any {
  return { ...(target['__metadata'] ?? {}) };
}

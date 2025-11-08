export class MetadataError extends Error {
  constructor(message: string) {
    super(`Metadata error: ${message}`);
  }
}

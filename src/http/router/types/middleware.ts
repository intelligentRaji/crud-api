export type Middleware = (body: any, next: (body: any) => Promise<void>) => Promise<void>;

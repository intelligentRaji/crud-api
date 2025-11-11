import { InjectionToken } from '@di';
import type { HandlerMetadata } from '@http/shared';

export const METADATA = new InjectionToken<Readonly<HandlerMetadata>>('METADATA');

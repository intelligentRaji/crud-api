import { InjectionToken } from '../../di/injection-token';
import type { ContentType } from '../types/conten-type-map';

export const DEFAULT_CONTENT_TYPE = new InjectionToken<ContentType>('DEFAULT_CONTENT_TYPE');

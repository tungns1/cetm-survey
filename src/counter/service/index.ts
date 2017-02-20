export * from './shared';
import { sharedServiceProvider } from './shared';

export const counterServiceProvider = [
    sharedServiceProvider
]
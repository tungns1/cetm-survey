export * from './shared';
export { WorkspaceGuard } from './workspace.guard';

import { sharedServiceProvider } from './shared';
import { WorkspaceGuard } from './workspace.guard';

export const counterServiceProvider = [
    sharedServiceProvider, WorkspaceGuard
]
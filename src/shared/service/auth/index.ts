export * from './auth.service';
export * from './auth-guard.service';
export * from './session.service';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { SessionService } from './session.service';

export const authProviders = [
    SessionService,
    AuthService,
    AuthGuard
]
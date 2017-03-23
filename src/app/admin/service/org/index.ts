
import { UserService } from './user';
import { BranchService } from './branch';

export { UserService } from './user';
export { BranchService } from './branch';

export const orgServiceProvider = [
    BranchService, UserService
]
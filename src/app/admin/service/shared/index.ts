
export {
    CrudApiService,
    BranchCrudApiService,
    CrudApiServiceGenerator,
    BranchCrudApiServiceGenerator
} from './crud';

export { AdminNavService } from './nav';
export { BranchFilterService } from '../../shared';
export * from '../../../shared/model';

import { AdminNavService } from './nav';
import { BranchCrudApiServiceGenerator, CrudApiServiceGenerator } from './crud';

export const shareServiceProvider = [
    AdminNavService,
    CrudApiServiceGenerator,
    BranchCrudApiServiceGenerator
]

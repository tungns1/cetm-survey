
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
import { FeedbackSurveyService } from './feedbackSurvey';
import { FeedbackSurveySocket } from './feedbackSurvey.socket';
export * from './feedbackSurvey';
export { FeedbackSurveySocket } from './feedbackSurvey.socket';

export const shareServiceProvider = [
    AdminNavService,
    CrudApiServiceGenerator,
    BranchCrudApiServiceGenerator, 
    FeedbackSurveyService, FeedbackSurveySocket
]

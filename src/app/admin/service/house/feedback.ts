import { Injectable } from '@angular/core';
import { BranchCrudApiService, IFeedback } from '../shared';

@Injectable()
export class FeedbackService extends BranchCrudApiService<IFeedback> {
    
}
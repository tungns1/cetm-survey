import { Injectable } from '@angular/core';
import { CrudApiService, IFeedbackUI } from '../shared';

@Injectable()
export class FeedbackUIService extends CrudApiService<IFeedbackUI> {
}

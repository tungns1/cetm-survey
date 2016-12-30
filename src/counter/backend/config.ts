import { Session } from '../shared';
import 'rxjs/add/operator/skip';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const Feedback = {
    required: false
}

Session.RxMySetting.skip(1).subscribe(s => {
    Object.assign(Feedback, s.config.feedback);
})
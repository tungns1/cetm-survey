import { Session, Model } from '../shared';
import 'rxjs/add/operator/skip';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const Feedback = {
    required: false
}

Session.RxMySetting.skip(1).subscribe(s => {
    Object.assign(Feedback, s.config.feedback);
})

export function PassFeedbackRequirement(t: Model.House.ITicket) {
    if (!Feedback.required) {
        return true;
    }
    if (!t) {
        return true;
    }
    const track = t.tracks[t.tracks.length - 1];
    const f = track.feedback;
    if (f && f.rating) {
        return true;
    }
    return false;
}

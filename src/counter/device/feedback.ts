import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export const FeedbackDeviceAvailabel$ = new BehaviorSubject<boolean>(false);

try {
    var myRequire = window['myRequire'];
    var feedback = myRequire('app/counter/feedback');
    console.log("Feedback is supported");
    feedback.OnShow(() => {
        FeedbackDeviceAvailabel$.next(true);
        console.log("Feedback shown");
    });
    feedback.OnHide(() => {
        FeedbackDeviceAvailabel$.next(false);
        console.log("Feedback hide");
    });
} catch (e) {
    console.log("Fail to determine feedback supportability", e);
}

function test() {
    FeedbackDeviceAvailabel$.next(true);
}

// test();
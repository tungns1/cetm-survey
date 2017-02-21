import { BehaviorSubject } from 'rxjs/BehaviorSubject';

let feedbackDeviceAvailable = false;

try {
    var myRequire = window['myRequire'];
    var feedback = myRequire('app/counter/feedback');
    console.log("Feedback is supported");
    feedback.OnShow(() => {
        feedbackDeviceAvailable = true;
        console.log("Feedback shown");
    });
    feedback.OnHide(() => {
        feedbackDeviceAvailable = false;
        console.log("Feedback hide");
    });
} catch (e) {
    console.log("Fail to determine feedback supportability", e);
}

export function IsFeedbackDeviceAvailable() {
    return feedbackDeviceAvailable
}

function test() {
    feedbackDeviceAvailable = true;
}

test();
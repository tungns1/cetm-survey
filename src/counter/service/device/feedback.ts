// import { feedbackDone } from '../queue';
let feedbackAvailable = false;


try {
    var myRequire = window['myRequire'];
    var feedback = myRequire('app/counter/feedback');
    console.log("Feedback is supported");
    feedback.OnShow(() => {
        feedbackAvailable = true;
        console.log("Feedback shown");
    });
    feedback.OnHide(() => {
        // feedbackDone.next(true);
        feedbackAvailable = false;
        console.log("Feedback hide");
    });
} catch (e) {
    console.log("Fail to determine feedback supportability", e);
}

export function IsFeedbackAvailable() {
    return feedbackAvailable;
}

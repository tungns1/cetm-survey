let feedbackAvailable = false;

try {
    var myRequire = window['myRequire'];
    var feedback = myRequire('app/counter/feedback');
    console.log("Feedback is supported");
    feedback.OnShow(() => feedbackAvailable = true);
    feedback.OnHide(() => feedbackAvailable = false);
} catch (e) {
    console.log("Fail to determine feedback supportability", e);
}

export function IsFeedbackAvailable() {
    return feedbackAvailable;
}

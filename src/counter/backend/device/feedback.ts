var FeedbackWindow;

try {
    var myRequire = window['myRequire'];
    FeedbackWindow = myRequire('app/feedback/main');
    if (FeedbackWindow) {
        console.log("Feedback is supported");
        FeedbackWindow.on('show', () => {

        })

        FeedbackWindow.on('hide', () => {

        })
    } else {
        console.log("Feedback is not supported");
    }
} catch (e) {
    console.log("Fail to determine feedback supportability", e);
}

export function IsFeedbackAvailable() {
    return FeedbackWindow && FeedbackWindow.isVisible();
}

var FeedbackWindow;

try {
    var myRequire = window['myRequire'];
    FeedbackWindow = myRequire('app/feedback');
    if (FeedbackWindow) {
        console.log("Feedback is supported");
    } else {
        console.log("Feedback is not supported");
    }
} catch (e) {
    console.log("Fail to determine feedback supportability", e);
}

FeedbackWindow.on('show', () => {

})

FeedbackWindow.on('hide', () => {

})

export function IsFeedbackAvailable() {
    return FeedbackWindow && FeedbackWindow.isVisible();
}

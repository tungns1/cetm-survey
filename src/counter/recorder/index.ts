import { Serving } from '../backend/queue';
import { Config, MP3Recorder } from './recorder.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const config: Config = {
    workerPath: '../asset/js/worker-realtime.js',
    bitRate: 64,
    host: 'http://localhost:3000/room/counter/record?fname=',
};

var isEnable = true;
if (isEnable) {
    var recorder = new MP3Recorder(config);
    recorder.start(function () {
        console.log('Start recorder!')
    }, function () {
        alert('We could not make use of your microphone at the moment');
    });

    const RxRecordFile = Serving.RxData.map(tickets => {
        if (tickets[0]) {
            return tickets[0].id + '.mp3'
        } else {
            return null
        }
    })

    RxRecordFile.subscribe(
        function (x) {
            recorder.setSessionID(x)
        },
        function (err) {
            console.log('Error: %s', err);
        },
        function () {
            console.log('Completed');
        }
    );
}




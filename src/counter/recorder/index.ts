import { Serving } from '../backend/queue';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare var nodeRequire: any;
const electron =  nodeRequire('electron');
var ipcRenderer = electron.ipcRenderer;

var isEnable = true;
if (isEnable) {
    const RxRecordFile = Serving.RxData.map(tickets => {
        if (tickets[0]) {
            return tickets[0].id + '_'+ tickets[0].cnum +'.mp3'
        } else {
            return null
        }
    })

    RxRecordFile.subscribe(
        function (x) {
           ipcRenderer.send('ticket-serving', x)
        },
        function (err) {
            console.log('Error: %s', err);
        },
        function () {
            console.log('Completed');
        }
    );
}




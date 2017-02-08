import { Serving } from '../../service/queue';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare var nodeRequire: any;
var ipcRenderer: any;

try {
    const electron = nodeRequire('electron');
    ipcRenderer = electron.ipcRenderer;
} catch (e) {

}

var isEnable = true;
if (isEnable) {
    const RxRecordFile = Serving.RxData.map(tickets => {
        if (tickets[0]) {    
            return [tickets[0].id + '_' + tickets[0].cnum + '.mp3', tickets[0].branch_id];
        } else {
            return [null, null]
        }
    })

    RxRecordFile.subscribe(
        function (x) {
            try {
                ipcRenderer.send('ticket-serving', x)
            } catch (e) {

            }
        },
        function (err) {
            console.log('Error: %s', err);
        },
        function () {
            console.log('Completed');
        }
    );
}




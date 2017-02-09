import * as Counter from './counter';
import * as Kiosk from './kiosk';
import * as Screen from './screen';
import * as SFlow from './sflow';

const houseServiceProvider = [
    Counter.CounterApi,
    Kiosk.KioskApi,
    Screen.ScreenApi,
    SFlow.SFlowApi
]

export {
    houseServiceProvider,
    Counter,
    Kiosk,
    Screen,
    SFlow,
}
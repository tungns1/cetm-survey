import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export const AppState = new BehaviorSubject<string>("init");
const AuxStates: { [index: string]: BehaviorSubject<any> } = {};

function GetAuxState(name: string) {
    let s = AuxStates[name];
    if (!s) {
        s = new BehaviorSubject<any>(null);
        AuxStates[name] = s;
    }
    return s;
}

export function AuxState(name: string, data?: any) {
    let s = GetAuxState(name);
    if (data !== undefined) {
        s.next(data);
    }
    return s
}
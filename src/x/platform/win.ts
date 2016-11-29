import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

export const rxWindowResize = Observable.fromEvent<UIEvent>(window, 'resize').throttleTime(1000);
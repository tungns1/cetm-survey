import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

export const rxWindowResize = Observable.fromEvent<UIEvent>(window, 'resize').throttleTime(1000);
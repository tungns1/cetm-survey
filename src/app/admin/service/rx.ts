
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/combinelatest';
import 'rxjs/add/operator/switchMap';

export class RepeatedObservable<T> extends Observable<T> {
  constructor(source: Observable<any>, func: (a: any) => Observable<T>) {
    super((observer: Observer<T>) => {
      Observable.combineLatest<any, any>(this.rxRefresh, source).switchMap(values => func(values[1])).subscribe(observer);
    });
  }
  private rxRefresh = new BehaviorSubject<boolean>(true);
  refresh() {
    this.rxRefresh.next(true);
  }
}

export class RefreshObservable<T> extends Observable<T> {
  constructor(private func: () => Observable<T>) {
    super((observer: Observer<T>) => {
      this.observer = observer;
      this.refresh();
    });
  }
  private observer: Observer<T>;
  refresh() {
    this.func().subscribe(v => this.observer.next(v));
  }
}
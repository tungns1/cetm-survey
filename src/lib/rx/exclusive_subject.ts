import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class ExclusiveEventEmitter<T> extends BehaviorSubject<T> {
  constructor() {
    super(null);
  }

  private subscription: ISubscription;

  ExclusiveSubscribe(cb) {
    this.unsubscribe();
    this.subscription = this.subscribe(cb);
  }

  Next() {
    this.next(null);
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

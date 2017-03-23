import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class ExclusiveEventEmitter {
  private e$ = new ReplaySubject(1);
  private subscription: ISubscription;

  ExclusiveSubscribe(cb) {
    this.unsubscribe();
    this.subscription = this.e$.subscribe(cb);
  }

  Next() {
    this.e$.next(null);
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

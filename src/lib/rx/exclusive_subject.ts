import { Subject ,  SubscriptionLike as ISubscription ,  ReplaySubject ,  BehaviorSubject } from 'rxjs';

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

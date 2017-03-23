import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';

export class ExclusiveSubject<T> {
  private e$ = new Subject<T>();
  private subscription: ISubscription;

  ExclusiveSubscribe(cb) {
    this.unsubscribe();
    this.subscription = this.e$.subscribe(cb);
  }

  next(v: T) {
    this.e$.next(v);
  }
  
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

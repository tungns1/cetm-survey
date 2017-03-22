import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/throttleTime';
import { Subject } from 'rxjs/Subject';

@Directive({
  selector: '[throttle]'
})
export class ThrottleDirective {

  constructor() { }

  ngOnInit() {
    this.click$.throttleTime(1000).subscribe(_ => {
      this.throttle.next(null);
    });
  }

  @HostListener("click") onClick() {
    this.click$.next(null);
  }
  private click$ = new Subject();
  @Output() throttle = new EventEmitter();
  
}

import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
// import 'rxjs/add/operator/throttleTime';
import { Subject } from 'rxjs/Subject';

@Directive({
  selector: '[throttle]'
})
export class ThrottleDirective {

  constructor() { }

  private click$ = new Subject();
  @HostListener("click") onClick() {
    this.click$.next(null);
  }
  @Output() throttle = new EventEmitter();
  @Input() threshold: number = 1000;

  ngOnInit() {
    this.click$.throttleTime(this.threshold).subscribe(_ => { this.throttle.next(null) });
  }

}

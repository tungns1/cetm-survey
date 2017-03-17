import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appReload]'
})
export class ReloadDirective {

  constructor() { }

  @Input("appReload") set reload(second: number) {
    this.delay = (second || 1) * 1000;
  }

  @HostListener("click") onClick() {
    setTimeout(_ => location.reload(), this.delay);
  }

  private delay = 0;
}

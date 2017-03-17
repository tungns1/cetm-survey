import { Directive, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appSafeNav]'
})
export class SafeNavDirective {

  constructor(
    private router: Router
  ) { }

  @Input("appSafeNav") link;

  @HostListener("click") onClick() {
    this.router.navigate([this.link], {
      queryParamsHandling: 'preserve'
    });
  }

}

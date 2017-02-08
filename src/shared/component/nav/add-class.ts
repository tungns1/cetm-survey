import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[addClass]'
})
export class AddClassDirective {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        let el = <HTMLElement>this.el.nativeElement
        el.classList.add(this.addClass);
    }

    @Input() addClass: string;
}
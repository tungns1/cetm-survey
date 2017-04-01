import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
	selector: 'accordion-title',
	template: `<ng-content></ng-content>`
})
export class AccordionTitleComponent {

}

@Component({
	selector: 'accordion',
	template: `
	<div (click)="Toggle()" class="hl-title-branch">
		<ng-content select="accordion-title"></ng-content>
        <span [class.hide]="expanded" style="float: right; color: #9a9a9b;"><i _ngcontent-lat-10="" class="fa fa-caret-down fa-lg"> </i></span>
        <span [class.hide]="!expanded" style="float: right; color: #0b8fdb;"><i _ngcontent-lat-10="" class="fa fa-caret-up fa-lg"> </i></span>
	</div>
	<div [class.hide]="!expanded" style="background-color: #fff; border-top: 1px solid #a7a9ac;">
		<ng-content></ng-content>
	</div>
	`
})
export class AccordionComponent {
	Expand() {
		if (this.expanded) {
			return;
		}
		this.expanded = true;
		if (this.expanded) {
			this.open$.next(this);
		}
	}

	Collapse() {
		this.expanded = false;
	}

	open$ = new Subject<AccordionComponent>();

	ngOnInit() {

	}

	Toggle() {
		if (this.expanded) {
			this.Collapse();
		} else {
			this.Expand();
		}
	}

	@Input() name: string;
	private expanded = false;
}
import {Component, Input, OnInit} from '@angular/core';

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
        <span *ngIf="isHidden" style="float: right;"><i _ngcontent-lat-10="" class="fa fa-angle-double-up"> </i></span>
        <span *ngIf="!isHidden" style="float: right;"><i _ngcontent-lat-10="" class="fa fa-angle-double-down"> </i></span>
	</div>
	<div [class.hidden]="isHidden">
		<ng-content></ng-content>
	</div>
	`
})
export class AccordionComponent {
	
	isHidden = true;
	@Input() isOpen : boolean;
	ngOnInit() {
		if(this.isOpen) {
			this.isHidden = false;
		}
    }

	Toggle() {
		this.isHidden = !this.isHidden
	}
}
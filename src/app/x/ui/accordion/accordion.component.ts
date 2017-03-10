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
        <span *ngIf="isHidden" style="float: right; color: #9a9a9b;"><i _ngcontent-lat-10="" class="fa fa-caret-down fa-lg"> </i></span>
        <span *ngIf="!isHidden" style="float: right; color: #0b8fdb;"><i _ngcontent-lat-10="" class="fa fa-caret-up fa-lg"> </i></span>
	</div>
	<div [class.hidden]="isHidden" style="background-color: #fff; border-top: 1px solid #c1c1c1;">
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
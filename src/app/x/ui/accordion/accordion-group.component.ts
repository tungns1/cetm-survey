import {
    Component, OnInit, Input, Output, EventEmitter,
    ContentChildren, QueryList
} from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { merge } from 'rxjs';

@Component({
    selector: 'accordion-group',
    template: `<ng-content></ng-content>`
})
export class AccordionGroupComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    ngAfterContentInit() {
        const open$ = this.children.map(c => c.open$);
        // merge(open$)
        // .subscribe(c => {
        //     this.open.next(c.name)
        // })
        // this.children.forEach(c => {
        //     c.open.subscribe(_ => {
        //         this.open.next(c.name);
        //     });
        // });
    }

    @Output() open = new EventEmitter<string>();

    @Input() set active(name: string) {
        this.children.forEach(c => {
            if (c.name === name) {
                c.Expand();
            } else {
                c.Collapse();
            }
        })
    }
    @ContentChildren(AccordionComponent) children: QueryList<AccordionComponent>;
}
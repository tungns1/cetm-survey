import {
    Component, Input, ContentChildren, QueryList
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: "chart-item",
    template: ``
})
export class ChartItemComponent {
    id = Math.random().toString(36).substring(3,6);
    @Input() field: string;
    @Input() color: string;
    @Input() title: string;
    @Input() tab: string;
    active = true;
}

@Component({
    selector: "chart-item-group",
    template: `<ng-content></ng-content>`
})
export class ChartItemGroup {
    @Input() group: string;
    @ContentChildren(ChartItemComponent) fields: QueryList<ChartItemComponent>;
    get items() {
        return this.fields.toArray();
    }

    Toggle(item: ChartItemComponent) {
        this.fields.forEach(f => {
            if (f.field === item.field) {
                f.active = !f.active;
            }
        })
    }
}

@Component({
    selector: "chart-item-group-view",
    template: `<ng-content></ng-content>`
})
export class ChartItemGroupView {
    @Input() set active(group: string) {
        this.view = group;
        this.refresh();
    }

    @ContentChildren(ChartItemGroup) groups: QueryList<ChartItemGroup>;
    ngAfterContentInit() {
        this.refresh();
    }

    groups$ = new BehaviorSubject<ChartItemComponent[][]>([]);
    items$ = this.groups$.map(groups => {
        return groups.reduce((res, g) => res.concat(g), []);
    });

    activeItems$ = this.items$.map(items => items.filter(t => t.active));
    activeGroups$ = this.groups$.map(groups => {
        return groups.map(g => g.filter(i => i.active));
    });

    private refresh() {
        if (!this.view || !this.groups) {
            return;
        }
        let groups = this.groups.filter(g => g.group === this.view);
        this.groups$.next(groups.map(g => g.items));
    }

    Toggle(item: ChartItemComponent) {
        this.groups.forEach(g => g.Toggle(item));
        this.refresh();
    }

    private view: string;
}
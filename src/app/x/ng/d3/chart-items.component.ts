import {
    Component, Input, ContentChildren, QueryList
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: "chart-item",
    template: ``
})
export class ChartItemComponent {
    id = Math.random().toString(36).substring(3, 6);
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
    @Input() title: string;

    @ContentChildren(ChartItemComponent) private fields: QueryList<ChartItemComponent>;
    

    Toggle(item: ChartItemComponent) {
        this.fields.forEach(f => {
            if (f.field === item.field) {
                f.active = !f.active;
            }
        });
        this.refresh();
    }

    refresh() {
        this.items = this.fields.toArray();
        this.activeItems = this.fields.filter(f => f.active);
    }

    items: ChartItemComponent[] = [];
    activeItems: ChartItemComponent[] = [];
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

    groups$ = new BehaviorSubject<ChartItemGroup[]>([]);
    items$ = this.groups$.map(groups => {
        return groups.reduce<ChartItemComponent[]>((res, g) => res.concat(g.items), []);
    });

    activeItems$ = this.items$.map(items => items.filter(t => t.active));

    private refresh() {
        if (!this.groups) {
            return;
        }
        this.groups.forEach(g => g.refresh());
        let groups = this.groups.toArray();
        if (this.view) {
            groups = groups.filter(g => g.group === this.view);
        }
        this.groups$.next(groups);

    }

    Toggle(item: ChartItemComponent) {
        this.groups.forEach(g => g.Toggle(item));
        this.refresh();
    }

    private view: string;
}
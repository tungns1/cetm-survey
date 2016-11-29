
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IBranch, BranchInLevel } from './branch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AllLevels } from './branch';

@Component({

    selector: 'branch-selector',
    template: `
    <span>{{level | levelName}}</span>
    <div>
    <select [ngModel]="selected" (ngModelChange)="updateChildren($event)"> // value is a string or number
        <option [style.display]="(count | async)<2? 'none':'block'" value="all">--Tất cả --</option>
        <option [style.display]="(count | async)>0? 'none':'block'" value="none">-- Không có dữ liệu --</option>
        <option *ngFor="let b of o?.shown | async" [value]="b.id">{{b.name}}</option>
    </select>
    </div>
    `,
    styles: [`
     select { width:100%;  height: 30px;border-radius:3px;}
     span{ margin-bottom: 5px;}
     `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchSelectorComponent {
    @Input() set level(v: number) {
        if (this._level > -1) {
            throw Error("branch level was already set");
        }
        this._level = v;
        this.o = AllLevels[this._level];
        this.o.shown.subscribe(branches => {
            if (branches.length === 1) {
                this.selected = branches[0].id;
            } else if (branches.length > 1) {
                this.selected = 'all';
            } else {
                this.selected = 'none';
            }
            this.count.next(branches.length);
        })
        this.o.SelectAll();
        // this.selected = 'all';
    }

    get level() {
        return this._level;
    }

    o: BranchInLevel;
    count = new BehaviorSubject<number>(0);
    selected: string;

    updateChildren(id: string) {
        switch (id) {
            case 'all':
                this.o.SelectAll();
                return;
            case 'none':
                return;
            default:
                this.o.SelectOnlyID(id);
                return
        }
    }

    private _level = -1;
}


@Component({

    selector: 'multi-branch-selector',
    template: `
     <input type="checkbox" (change)="checkAll(changes=!changes)" >&nbsp;Chọn tất cả<br>
    <div *ngFor="let b of o?.branches | async">
        <input type="checkbox" [ngModel]="b._checked" (ngModelChange)="change($event, b.id)" />&nbsp;{{b.name}}
    </div>
    `,
    styles: [`
     select { width:100%;  height: 30px;border-radius:3px;}
     span{ margin-bottom: 5px;}
     `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiBranchSelectorComponent {
    @Input() set level(v: number) {
        if (this._level > -1) {
            throw Error("branch level was already set");
        }
        this._level = v;
        this.o = AllLevels[this._level];
    }
    checkAll(event) {
        let selects: IBranch[] = [];
        this.o.shown.value.forEach(u => {
            u._checked = event
            selects.push(u);
        });
        this.o.shown.next(selects);
    }

    change(checked: boolean, id: string) {
        this.o.ChangeByID(id, checked);
    }

    o: BranchInLevel;

    get level() {
        return this._level;
    }

    private _level = -2;
}


import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IBranch, BranchInLevel } from './branch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AllLevels } from './branch';

@Component({
    selector: 'multi-branch-selector',
    template: `
     <input type="checkbox" (change)="checkAll(changes=!changes)" >&nbsp;Chọn tất cả<br>
    <div *ngFor="let b of o?.shown | async">
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
        if (this.inited) {
            throw Error("branch level was already set");
        }
        this.inited = true;
        this._level = v || 0;
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

    o: BranchInLevel = AllLevels[0];

    get level() {
        return this._level;
    }

    private _level = 0;
    private inited = false;
}

@Component({
    selector: 'branch-selector',
    template: `
        <div>
            Chọn Tỉnh/Thành <br>
            <multi-branch-selector level="2"></multi-branch-selector>
        </div>
        <div>
            Chọn chi nhánh <br>
            <multi-branch-selector level="1"></multi-branch-selector>
        </div>
        <div>
            Chọn phòng giao dịch <br>
            <multi-branch-selector level="0"></multi-branch-selector>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchSelectorComponent {

}

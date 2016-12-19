
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IBranch, GetLayer, BranchLayer } from './branch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
        this.o = GetLayer(this._level);
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

    o: BranchLayer = GetLayer(0) ;

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
            <div class="tl" (click)="active='tinhthanh'">Chọn Tỉnh/Thành<i class="fa fa-caret-down" aria-hidden="true"></i></div>
            <div class="select" [ngClass]="{'hidden': active!='tinhthanh'}">
                <multi-branch-selector level="2"></multi-branch-selector>
            </div>
        </div>
        <div>
            <div class="tl" (click)="active='chinhanh'">Chọn chi nhánh<i class="fa fa-caret-down" aria-hidden="true"></i></div>
            <div class="select" [ngClass]="{'hidden': active!='chinhanh'}">
                <multi-branch-selector level="1"></multi-branch-selector>
            </div>
        </div>
        <div>
            <div class="tl" (click)="active='giaodich'">Chọn phòng giao dịch<i class="fa fa-caret-down" aria-hidden="true"></i></div>
            <div class="select" [ngClass]="{'hidden': active!='giaodich'}">
                <multi-branch-selector level="0"></multi-branch-selector>
            </div>
        </div>
    `,
     styles: [`
     
            .hidden {
                display: none;
            }
            i{
                float: right;
                cursor: pointer;

            }
            .tl {
                height: 40px;
                line-height: 40px;
                padding: 0px 20px;
                cursor: pointer;
                border-top: 1px solid #b0b1b5;
                border-bottom: 1px solid #b0b1b5;
            }
            .select {
                background-color: #fff;
                padding: 5px 20px 5px 20px;
                overflow: auto;
                height: 150px;
            }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchSelectorComponent {
     active='';
}

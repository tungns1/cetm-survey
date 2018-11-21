import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IStaffPosition, ICounter, IUser, ICounterUserConfigs } from '../../shared'

const STAFF_POSITION_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StaffPositionComponent),
    multi: true
}

interface ICounterUser extends ICounter {
    availableUsers?: IUser[];
    selectedUser?: string;
}

@Component({
    selector: 'staff-pos',
    template: `
        <div *ngFor="let counter of counters; let counterIndex = index" fxLayout="row" fxLayoutGap="50px">
            <span fxFlex="200px">{{counter.name}}</span>
            <select fxFlex="500px" class="hl-select" #staff (change)="OnChange(counter.id, staff.value)" [(ngModel)]="counter.selectedUser">
                <option value="unset">Unset</option>
                <option *ngFor="let user of counter.availableUsers" [value]="user.id">{{user.fullname}}</option>
            </select>
        </div>
    `,
    providers: [STAFF_POSITION_CONTROL_VALUE_ACCESSOR]
})
export class StaffPositionComponent implements ControlValueAccessor {

    protected value: ICounterUserConfigs[];
    private counters: ICounterUser[];
    private users: IUser[];
    private curentBranch: string = '';
    private onChangeCallback = (v) => { };

    @Input() config: ICounterUserConfigs[] = [];

    @Input() set branchID(id: string) {
        this.curentBranch = id;
    }
    @Input() set data(d: IStaffPosition) {
        if (d) {
            if (d.counters && d.counters.length) {
                this.counters = d.counters.sort((a, b) => {
                    return Number.parseInt(a.cnum) - Number.parseInt(b.cnum);
                });
                this.counters.forEach(c => {
                    let relatedConfig = this.config.find(config => config.counter_id === c.id);
                    let selectedUser: string = relatedConfig ? relatedConfig.user_id : 'unset';
                    c.selectedUser = selectedUser;
                });
            } else {
                this.counters = [];
            }
            if (d.users && d.users.length) {
                this.users = d.users;
                let users = d.users.filter(user => !(d.counter_user_configs.find(config => config.user_id === user.id)))
                    .sort((a, b) => a.fullname.toUpperCase() > b.fullname.toUpperCase() ? 1 : -1);
                this.counters.forEach(counter => {
                    counter.availableUsers = JSON.parse(JSON.stringify(users));
                });
            } else {
                this.counters.forEach(counter => {
                    counter.availableUsers = [];
                });
            }
        }
    }

    writeValue(v?: ICounterUserConfigs[]) {
        v = v || [];
        this.value = [];
        v.forEach(config => {
            this.OnChange(config.counter_id, config.user_id);
        })
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) { }

    OnChange(counterID: string, userID: string) {
        if (this.counters.length > 0) {
            let configIndex = this.value.findIndex(config => config.counter_id === counterID);
            // Select staff
            if (userID !== 'unset') {
                if (configIndex !== -1) {
                    this.value.splice(configIndex, 1)
                }
                let config: ICounterUserConfigs = {
                    branch_id: this.curentBranch,
                    counter_id: counterID,
                    user_id: userID
                }
                this.value.push(config);
                this.counters.forEach(counter => {
                    let userIndex: number = counter.availableUsers.findIndex(user => user.id === userID);
                    if (counter.id !== counterID && userIndex !== -1) {
                        counter.availableUsers.splice(userIndex, 1);
                    }
                });
                this.counters[this.counters.findIndex(counter => counter.id === counterID)].selectedUser = userID;
            } else { // Deselect staff
                this.counters.forEach(counter => {
                    if (counter.id !== counterID) {
                        counter.availableUsers.push(this.users.find(user => user.id === this.value[configIndex].user_id));
                        counter.availableUsers.sort((a, b) => a.fullname.toUpperCase() > b.fullname.toUpperCase() ? 1 : -1);
                    }
                });
                this.counters[this.counters.findIndex(counter => counter.id === counterID)].selectedUser = 'unset';
                if (configIndex !== -1) {
                    this.value.splice(configIndex, 1)
                }
            }
        }
        this.onChangeCallback(this.value);
    }
}

import { SelectCheckModule } from '../../../../x/ng';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        FormsModule, CommonModule,
        SelectCheckModule, FlexLayoutModule
    ],
    declarations: [StaffPositionComponent],
    exports: [StaffPositionComponent]
})
export class StaffPositionModule {

}

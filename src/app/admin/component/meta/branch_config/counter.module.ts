import { FormGroup, FormControl } from '@angular/forms';
import { findIndex } from 'lodash';
import { Component, Input, forwardRef, ExistingProvider } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICounterConfig } from '../../../../../const/project';

const COUNTER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterConfigComponent),
    multi: true
}

@Component({
    selector: 'counter-config',
    templateUrl: 'counter-config.component.html',
    styleUrls: ['counter.scss'],
    providers: [COUNTER_CONTROL_VALUE_ACCESSOR]
})
export class CounterConfigComponent implements ControlValueAccessor {

    constructor(private house: HouseService){}
    private curentBranch: string = '';
    private list_counters_login = []

    @Input() set branchId(id: string){
        this.curentBranch = id
    };

    @Input() set data(d){
        if(d && this.curentBranch !== ''){
            this.house.CounterService.GetByBranch([this.curentBranch]).subscribe(v => {
                if(v){
                    //gán lại giá trị cho các counter 
                    for (let j = 0; j < v.length; j++) {
                        const counter = (v[j]);
                        for (let i = 0; i < d.length; i++) {
                            const login = JSON.parse(d[i]);
                            if(counter.id === login.counter){
                                let item = Object.assign({
                                    counter: counter,
                                    login: login.login,
                                    force: login.force
                                })
                                if(this.checkDuplicated(this.list_counters_login, item) === 0) {
                                    this.list_counters_login.push(item)
                                }
                            }
                        }
                        
                    }

                    // tạo mới nếu thêm counter
                    for(let i = 0; i < v.length; i++){
                        const counter = (v[i]);
                        let item = Object.assign({
                            counter: counter,
                            login: true,
                            force: true
                        })
                        if(this.checkDuplicated(this.list_counters_login, item) === 0) {
                            this.list_counters_login.push(item)
                        }
                    }

                    //
                }
            })
        }
    };

    checkDuplicated(array, item){
        let check = array.filter(i => {
            return i.counter.id === item.counter.id
        })
        return check.length
    }

    protected value: ICounterConfig = {
        record_transaction: 'alway_off',
        auto_login_counters: []
    }

    ngOnInit(){
    }

    private onChangeCallback = (v) => { };

    writeValue(v: any) {
        this.value = v || {};
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    OnChange() {
        this.onChangeCallback(this.value);
    }

    onChangeLogin(e, id){
        let d = this.list_counters_login.map(item => {
            let i = {
                counter: item.counter.id,
                login: item.login,
                force: item.force
            }
            return JSON.stringify(i)
        })
        this.value.auto_login_counters = d
        this.onChangeCallback(this.value);
    }

    onChangeForce(e, id){
        let d = this.list_counters_login.map(item => {
            let i = {
                counter: item.counter.id,
                login: item.login,
                force: item.force
            }
            return JSON.stringify(i)
        })
        this.value.auto_login_counters = d
        this.onChangeCallback(this.value);
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICounter, SharedModule, CacheCounter, HouseService } from '../../shared';


@NgModule({
    imports: [FormsModule, CommonModule, SharedModule],
    declarations: [CounterConfigComponent],
    exports: [CounterConfigComponent]
})
export class CounterConfigModule {

}

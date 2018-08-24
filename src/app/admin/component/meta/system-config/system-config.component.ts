import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-system-config',
    templateUrl: './system-config.component.html',
    styleUrls: ['./system-config.component.scss']
})
export class SystemConfigComponent implements OnInit{

    constructor() { }

    ngOnInit(){
        this.form.valueChanges.subscribe(v => {
        })
    }

    onSubmit(){
        if(this.form.valid){
        }
    }

    form = new FormGroup({
        station: new FormGroup({
            stationSync: new FormGroup({
                mode: new FormControl(),
                stores: new FormControl([]),
                token: new FormControl()
            }),
            stationServer: new FormGroup({
                port: new FormControl()
            }),
            stationLog: new FormGroup({
                logDir: new FormControl(),
                logToStdErr: new FormControl(),
                verbosity: new FormControl()
            }),
            storage: new FormGroup({
                upload: new FormControl(),
                record: new FormControl(),
                update: new FormControl(),
            }),
            proxy: new FormGroup({
                upload: new FormControl(),
                update: new FormControl(),
                record: new FormControl(),
            }),
            static: new FormGroup({
                appFolder: new FormControl(),
                deviceFolder: new FormControl(),
            })
        }),
        database: new FormGroup({
            dbHost: new FormControl(),
            dbName: new FormControl(),
        }),
        business: new FormGroup({
            general: new FormGroup({
                defaultLanguage: new FormControl(),
                supportedLanguages: new FormControl([]),
            }),
            service: new FormGroup({
                maxWaitingMinute: new FormControl(),
                maxServingMinute: new FormControl(),
                autoFinishMinute: new FormControl(),
                waitLongAlertPercent: new FormControl(),
                serveLongAlertPercent: new FormControl(),
            }),
            priority: new FormGroup({
                priorityStep: new FormControl(),
                movedTicket: new FormControl(),
                restoreTicket: new FormControl(),
                internalVipCard: new FormControl(),
                customerVipCard: new FormControl(),
                privilegedCustomer: new FormControl(),
                bookedTicket: new FormControl(),
                minPriorityRestricted: new FormControl(),
                minPriorityUnorderCall: new FormControl(),
            })
        })
    })


}

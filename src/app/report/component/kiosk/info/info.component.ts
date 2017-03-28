import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { IInfoKioskEff } from '../../shared/';
import { KioskAPI, RxKioskEff } from '../service/kiosk.service';

@Component({
    selector: 'report-info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.scss']
})
export class ReportInfoComponent {
    constructor(
        private kioskAPI: KioskAPI
    ) { }


    infoKiosk: IInfoKioskEff = null;
    ngOnInit() {
        RxKioskEff.subscribe(v => {
            if (v.length > 0) {
                var total_kiosk = v.length;
                var total_activity = 0;
                var longest_activity_time = 0;
                var shortest_activity_time = 0;
                var longest_activity_kiosk = '';
                var shortest_activity_kiosk = '';
                
                for (var i = 0; i < v.length; i++) {
                    console.log(v[i].total_on_time);
                    total_activity += v[i].total_on_time;
                    if (longest_activity_time <= v[i].total_on_time) {
                        longest_activity_time = v[i].total_on_time;
                        longest_activity_kiosk = v[i].branch_id;
                    }
                    if (shortest_activity_time >= v[i].total_on_time) {
                        shortest_activity_time = v[i].total_on_time;
                        shortest_activity_kiosk = v[i].branch_id;
                    }
                }
                var average_activity_time = total_activity / total_kiosk;
                var average_kiosk_eff=0;
                this.infoKiosk ={
                    'total_kiosk':total_kiosk,
                    'longest_activity_time':longest_activity_time,
                    'shortest_activity_time':shortest_activity_time,
                    'total_activity':total_activity,
                    'longest_activity_kiosk':longest_activity_kiosk,
                    'shortest_activity_kiosk':shortest_activity_kiosk,
                    'average_activity_time':average_activity_time,
                    'average_kiosk_eff':average_kiosk_eff
                };
               
            }

        })

    }

    ngOnDestroy() {

    }
}
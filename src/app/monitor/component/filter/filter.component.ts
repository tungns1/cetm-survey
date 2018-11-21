import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MonitorNavService } from '../../service';
import { ChannelFilterService } from './channel-filter/channel-filter.service';
import { throttleTime } from 'rxjs/operators';

@Component({
    selector: 'monitor-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.css']
})
export class MonitorFilterComponent {
    constructor(
        private navService: MonitorNavService,
        private channelFilterService: ChannelFilterService,
        private route: Router
    ) { }

    @Output() view = new EventEmitter();
    isSurvey: boolean = false;
    isStoreChannel: boolean = false;

    ngOnInit() {
        this.route.events.pipe(throttleTime(500)).subscribe(data => {
            if(data['url']){
                this.isSurvey = data['url'].indexOf('/monitor/survey') === 0;
            }
        })
        this.channelFilterService.Data$.subscribe(data => {
            if (data.channel) {
                if (data.channel.length === 1 && data.channel[0] === 'store') {
                    this.isStoreChannel = true;
                } else this.isStoreChannel = false;
            }
        })
    }

    refresh() {
        this.navService.Refresh$.Next();
        this.view.next();
    }
}
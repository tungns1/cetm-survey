import { Component, ViewEncapsulation } from '@angular/core';
import { ChannelFilterService } from './filter/channel-filter/channel-filter.service';

@Component({
    selector: 'app-monitor',
    templateUrl: 'monitor.component.html',
    encapsulation: ViewEncapsulation.None
})
export class MonitorComponent {
    constructor(
        private channelFilterService: ChannelFilterService,
    ) { }
    child

    onFilter() {
        
        if (Object.keys(this.child)[0] === 'sumService') {
            this.child.sumService.refreshData();
        }
        const channel = this.channelFilterService.Data.channel
        if (channel) {
            if (!channel.length || (channel.length === 1 && channel[0] === 'store')) {
                this.child.sumService.isStoreChannel$.next(true);
            } 
            else this.child.sumService.isStoreChannel$.next(false);
        }
    }

    onActivate(componentRef) {
        this.child = componentRef;
    }
}

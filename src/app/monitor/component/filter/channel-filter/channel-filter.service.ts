import { Injectable } from '@angular/core';

interface IChannelFilter {
    channel: string[];
}

import {
    SmallStorage,
    RouterQueryStorageStrategy
} from '../../shared';

@Injectable()
export class ChannelFilterService extends SmallStorage<IChannelFilter> {
    constructor(
        private storageStrategy: RouterQueryStorageStrategy,
    ) {
        super("channels", storageStrategy);
    }

    Update(channel: string[] = []) {
        this.data.channel = channel;
        // console.log(this.data)
        this.SaveData(true);
    }
    
}
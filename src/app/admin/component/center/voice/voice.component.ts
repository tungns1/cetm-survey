import { Component, Injector } from '@angular/core';
import { CenterService, IVoiceList } from '../../shared/';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAdminComponent, CommonValidator } from '../../shared';

@Component({
    selector: 'center-voice',
    templateUrl: 'voice.component.html'
})
export class VoiceComponent extends BaseAdminComponent<IVoiceList> {
    constructor(
        injector: Injector,
        private center: CenterService
    ) {
        super(injector, center.VoiceListService);
    }

    makeForm(b?: IVoiceList) {
        b = b || <any>{};
        b.behavior = b.behavior || {};
        return new FormGroup({
            id: new FormControl(b.id),
            name: new FormControl(b.name),
            i18n: new FormControl(b.i18n),
            behavior: new FormGroup({
                sleep_second: new FormControl(b.behavior.sleep_second),
                max_queue_length: new FormControl(b.behavior.max_queue_length)
            })
        });
    }

}




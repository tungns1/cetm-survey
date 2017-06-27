import {
    Component, OnInit,
    Output, EventEmitter
} from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AppStorage } from '../../shared';
import { TranslateService } from '../../shared/util';

@Component({
    selector: 'history-filter',
    templateUrl: 'history-filter.component.html',
    styleUrls: ['history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

    constructor(
        private mdSnackBar: MdSnackBar,
        private translateService: TranslateService
    ) { }


    @Output() filterChange = new EventEmitter();

    filter = {
        wtimemin: '',
        wtimemax: '',
        stimemin: '',
        stimemax: '',
        rating: '',
    };

    ngOnInit() {

    }

    // onChange() {
    //     if (this.filter.wtimemin > this.filter.wtimemax)
    //         this.filter.wtimemax = this.filter.wtimemin;
    //     if (this.filter.stimemin > this.filter.stimemax)
    //         this.filter.stimemax = this.filter.stimemin;
    // }

    query() {
        if (this.filter.wtimemin > this.filter.wtimemax || this.filter.stimemin > this.filter.stimemax) {
            this.mdSnackBar
                .open(this.translateService.translate('Cant filter'),
                this.translateService.translate('Close'), {
                    duration: 6000
                });
        } else {
            this.filterChange.emit(this.filter);
        }

    }


}
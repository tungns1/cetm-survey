import {
    Component, OnInit,
    Output, EventEmitter
} from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { AppStorage } from '../../shared'

@Component({
    selector: 'history-filter',
    templateUrl: 'history-filter.component.html',
    styleUrls: ['history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

    constructor(
        private mdSnackBar: MdSnackBar
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
        if(this.filter.wtimemin > this.filter.wtimemax || this.filter.stimemin > this.filter.stimemax) {
            if (AppStorage.Culture === 'vi')
                this.mdSnackBar.open("Không thể lọc!", "CLOSE", {
                    duration: 6000
                }); 
            else
                this.mdSnackBar.open("Can't filter!", "CLOSE", {
                    duration: 6000
                }); 
        } else {
            this.filterChange.emit(this.filter);
        }
        
    }


}
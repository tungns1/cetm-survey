import {
    Component, OnInit,
    Output, EventEmitter
} from '@angular/core';

@Component({
    selector: 'history-filter',
    templateUrl: 'history-filter.component.html',
    styleUrls: ['history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

    filter = {
        wtimemin: '',
        wtimemax: '',
        stimemin: '',
        stimemax: '',
        rating: '',
    };

    // onChange() {
    //     if (this.filter.wtimemin > this.filter.wtimemax)
    //         this.filter.wtimemax = this.filter.wtimemin;
    //     if (this.filter.stimemin > this.filter.stimemax)
    //         this.filter.stimemax = this.filter.stimemin;
    // }

    query() {
        console.log(this.filter);
        this.filterChange.emit(this.filter);
    }

    @Output() filterChange = new EventEmitter();


}
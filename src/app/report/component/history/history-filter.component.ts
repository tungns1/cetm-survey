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
        wtimemin: 0,
        wtimemax: 0,
        stimemin: 0,
        stimemax: 0,
        rating: ''
    };

    onChange() {
        if (this.filter.wtimemin > this.filter.wtimemax)
            this.filter.wtimemax = this.filter.wtimemin;
        if (this.filter.stimemin > this.filter.stimemax)
            this.filter.stimemax = this.filter.stimemin;
        this.filterChange.emit(this.filter);
    }

    @Output() filterChange = new EventEmitter();


}
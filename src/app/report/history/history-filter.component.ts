import {
    Component, OnInit,
    Output, EventEmitter
} from '@angular/core';
import { Toast } from '../../x/ui/noti/toastr';
import { AppStorage } from '../../shared'

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

    toast = new Toast;

    // onChange() {
    //     if (this.filter.wtimemin > this.filter.wtimemax)
    //         this.filter.wtimemax = this.filter.wtimemin;
    //     if (this.filter.stimemin > this.filter.stimemax)
    //         this.filter.stimemax = this.filter.stimemin;
    // }

    query() {
        console.log(this.filter);
        console.log("................",this.filter.wtimemax);
        if(this.filter.wtimemin > this.filter.wtimemax || this.filter.stimemin > this.filter.stimemax) {
            if (AppStorage.Culture === 'vi')
                    this.toast.Title('Bộ lọc').Info("Không thể lọc!").Show();
                else
                    this.toast.Title('Filter').Info("Can't filter!").Show();
        } else {
            this.filterChange.emit(this.filter);
        }
        
    }

    @Output() filterChange = new EventEmitter();


}
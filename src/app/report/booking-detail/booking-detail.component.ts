import { Component, OnInit, Injector } from '@angular/core';
import { BranchFilterService, CacheBranch, IBranch } from '../shared';
import { FormArray, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent, MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { BookingService } from '../shared/service/booking-service.service';
import { IAppointmentDetail, IResponDetail } from '../appointment-performance/shared/appointment-performance.model';
import { DatePipe } from '@angular/common';
import { TimeDurationPipe } from '../../x/ng/time/timeDuration';
import { TranslateService } from '../../shared/util';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
@Component({
    selector: 'app-booking-detail',
    templateUrl: './booking-detail.component.html',
    styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

    constructor(
        private filterService: BranchFilterService,
        private bookingService: BookingService,
        private mdDialog: MatDialog,
        private datePipe: DatePipe,
        private secondToTime: TimeDurationPipe,
        protected injector: Injector,
    ) { }
    protected matSnackBar = this.injector.get(MatSnackBar);
    protected translateService = new TranslateService;
    selectedStore: IBranch;
    options$ = this.filterService.test1;
    date = new Date();
    now = Math.floor(Date.now() / 1000);
    delayTime = 15 * 60;
    startDate = 0;
    endDate = 0;
    detailSumery$ = this.bookingService.bookingDetailSumeryData;
    tickets: IResponDetail[] = [];
    branch_name: string = '';
    ngOnInit() {

        this.bookingService.bookingDetailTicketData.subscribe(v => {
            this.tickets = v.map(item => {
                return {
                    total: item.tickets.length,
                    timeBlock: `${item.id}:00 - ${item.id + 1}:00`,
                    tickets: item.tickets
                }
            })
        })


        var startOfDay = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0).getTime() / 1000;
        var endOfDay = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 23, 59, 59).getTime() / 1000;
        this.startDate = startOfDay;
        this.endDate = endOfDay

    }
    config = {
        displayKey: "name", //if objects array passed which key to be displayed defaults to description,
        search: true //enables the search plugin to search in the list
    }

    onSelect() { }
    selectionChanged(e) {
        if (e.value) {
            if (e.value.length > 0) {
                
                this.selectedStore = e.value[0]
                this.branch_name = e.value[0].name;
                this.refresh();
            }
        }
    }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        var startOfDay = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate(), 0, 0, 0).getTime() / 1000;
        var endOfDay = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate(), 23, 59, 59).getTime() / 1000;
        this.startDate = startOfDay;
        this.endDate = endOfDay
        this.refresh();
    }
    refresh() {
        if (this.selectedStore && this.startDate !== 0 && this.endDate !== 0) {
            this.bookingService.RefreshDetail(this.selectedStore.id, this.startDate, this.endDate);
        } else {
            setTimeout(_ => {
                const ref = this.matSnackBar
                    .open(this.translateService.translate('Please check Area, Branch and select Store!'),
                        this.translateService.translate('Close'), {
                            duration: 5000,
                            panelClass: ["warning"]
                        });
            })
        }
    }

    getDetail(data: IAppointmentDetail) {
        // console.log(data)
        if (data) {
            let serving_at = data.serving_at > 0 ? this.datePipe.transform(data.serving_at * 1000, 'HH:mm dd/MM/yyyy')+' ,' : ''
            data['type_ticket_label'] = (data.type_ticket === 'book_schedule') ? 'Schedule' : 'Get ticket'
            data['appoinment_time'] = data.time_go_bank > 0 ? this.datePipe.transform(data.time_go_bank * 1000, 'HH:mm dd/MM/yyyy') : '-'
            data['arrived'] = data.check_in_at > 0 ? 'Yes' : 'No';
            data['check_in_time'] = data.check_in_at > 0 ? this.datePipe.transform(data.check_in_at * 1000, 'HH:mm dd/MM/yyyy') : '-'
            data['wait_time'] = data.waiting_time > 0 ? this.secondToTime.transform(data.waiting_time) : '-'
            data['serve_time'] = data.serving_time > 0 ? serving_at+this.secondToTime.transform(data.serving_time) : '-'
            data['transaction_status'] = this.getTransactionStatus(data.status)
            data['customer_name'] = data.customer.name !== '' ? data.customer.name : data.customer.full_name
            data.branch_name = this.branch_name
            const config = new MatDialogConfig();
            config.width = '550px';
            config.data = data
            const dialog = this.mdDialog.open(DetailModalComponent, config);
        }
    }
    getTransactionStatus(status) {
        let result = '-'
        switch (status) {
            case 'finished':
                result = 'Finish'
                break;
            case 'deleted':
                result = 'Cancel'
                break;
            case 'cancelled':
                result = 'Cancelled';
                break;
            case 'created':
                result = 'Created';
                break;
            case 'confirmed':
                result = 'Confirmed';
                break;
            default:
                result = 'Not arrived';
                break;
        }
        return result;
    }
}

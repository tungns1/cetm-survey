import { Component, OnInit, ViewChild, Optional, Inject } from '@angular/core';
import {
    ICustomer, IUser, USER_ROLES, Customer, RuntimeEnvironment
} from '../shared';
import { ITransactionView, TransactionHistoryApi } from './shared';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ReportCustomerService } from '../shared';
import { LocalDayTimePipe } from '../../x/ng/time/localDayTime';

@Component({
    selector: 'transaction',
    templateUrl: 'transaction.component.html',
    styleUrls: ['history.component.scss']
})
export class TransactionComponent implements OnInit {

    constructor(
        private router: Router,
        private dialog: MatDialog,
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
        private transactionHistoryApi: TransactionHistoryApi,
        private env: RuntimeEnvironment,
        private reportCustomerService: ReportCustomerService,
    ) { }

    data: ITransactionView;
    audio_url: string; // link to audio 
    customer: ICustomer;
    admin: IUser;
    manager: IUser;
    ctime = '';

    ngOnInit() {
        this.data = this.dialogData;
        console.log(this.data)
        this.audio_url = this.getAudioLink(this.dialogData.audio);
        this.getBranchUsers(this.dialogData.branch_id);
        this.getCustomer(this.dialogData.customer_id);
        this.printTimeCellRendered();
    }

    private getAudioLink(uri: string) {
        if (!uri) return '';
        return `${this.env.Platform.Http}/api/report/record/${uri}`;
    }

    private getCustomer(customer_id: string) {
        if (customer_id != null) {
            this.customer = null;
            this.transactionHistoryApi.GetInfoCustomer(customer_id)
                .subscribe(v => {
                    this.customer = new Customer(v)
                });
        }
        else {
            this.customer = this.data.customer;
        }
    }

    private getBranchUsers(branch_id: string) {
        if (!branch_id) return;
        this.admin = null;
        this.manager = null;
        this.reportCustomerService.GetUserByRoleNBranch(branch_id, USER_ROLES.ADMIN)
            .subscribe(users => this.admin = users[0]);
        this.reportCustomerService.GetUserByRoleNBranch(branch_id, USER_ROLES.MANAGER)
            .subscribe(users => this.manager = users[0]);
    }

    goToCustomer(customer_id: string) {
        this.router.navigate(['/report/customer', customer_id]);
    }

    close() {
        this.dialog.closeAll();
    }
    printTimeCellRendered() {
        let localDayTime = new LocalDayTimePipe();
        if (this.data) {
            this.ctime = localDayTime.transform(this.data.ctime);
        }

    }
}
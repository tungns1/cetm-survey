import { Component, OnInit, ViewChild } from '@angular/core';
import {
    ITransactionView, ICustomer, IUser, USER_ROLES,
    RuntimeEnvironment
} from '../shared';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { TransactionHistoryApi } from './history.service';
import { ReportCustomerService } from '../../service';

@Component({
    selector: 'transaction',
    templateUrl: 'transaction.component.html',
    styleUrls: ['history.component.scss']
})
export class TransactionComponent implements OnInit {

    constructor(
        private router: Router,
        private mdDialogRef: MdDialogRef<TransactionComponent>,
        private transactionHistoryApi: TransactionHistoryApi,
        private env: RuntimeEnvironment,
        private reportCustomerService: ReportCustomerService,
    ) { }

    ngOnInit() {

    }

    SetData(d: ITransactionView) {
        this.data = d;
        this.audio_url = this.getAudioLink(d.audio);
        this.getBranchUsers(d.branch_id);
        this.getCustomer(d.customer_id);
    }

    private getAudioLink(uri: string) {
        if (!uri) return '';
        return `${this.env.Platform.Http}/api/report/record/${uri}`;
    }

    private getCustomer(customer_id: string) {
        if (!customer_id) return;
        this.customer = null;
        this.transactionHistoryApi.GetInfoCustomer(customer_id)
            .subscribe(v => this.customer = v);
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

    private data: ITransactionView;
    private audio_url: string; // link to audio 
    customer: ICustomer;
    admin: IUser;
    manager: IUser;
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ITransactionView, ModalComponent, ICustomer, RuntimeEnvironment
 } from '../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
        private transactionHistoryApi: TransactionHistoryApi,
        private env: RuntimeEnvironment,
        private reportCustomerService: ReportCustomerService,
    ) { }
    customer: ICustomer;
    admin: ICustomer;
    manager: ICustomer;

    @ViewChild(ModalComponent) modal: ModalComponent;
    
    ngOnInit() {

    }

    SetData(d: ITransactionView) {
        if(d.branch_id){
            this.reportCustomerService.GetUserByRoleNBranch(d.branch_id, 'admin').subscribe(v => {
                this.admin = v;
            });
            this.reportCustomerService.GetUserByRoleNBranch(d.branch_id, 'manager').subscribe(v => {
                this.manager = v;
            });
        }
        this.link = '';
        this.data = d;
        if (d.audio) {
            this.link=this.env.Platform.Http+'/api/report/record/'+d.audio;
            // this.link = this.appService.MakeLink(`/api/report/record/${d.audio}`);
        }
        this.modal.Open();
    }
    GetInfoCustomer(d: ITransactionView) {
        this.customer = null;
        this.state=d.state.charAt(0).toUpperCase() + d.state.slice(1);
        this.transactionHistoryApi.GetInfoCustomer(d.customer_id).subscribe(v => {
            this.customer = v;
        });
    }


    Close() {
        this.modal.Close();
    }
    goToCustomer(customer_id: string) {
        this.router.navigate(['/report/customer',customer_id]);
    }

    data = {};
    link: string;
    state:string;
}
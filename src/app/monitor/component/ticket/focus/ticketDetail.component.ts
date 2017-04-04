import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent, ICustomer, ITicket } from '../../shared';
import { MonitorCustomerService } from '../shared';

@Component({
    selector: 'ticket-detail',
    templateUrl: 'ticketDetail.component.html',
    styleUrls: ['ticketDetail.component.scss']
})
export class TicketDetailComponent {

    constructor(
        private customerService: MonitorCustomerService,
    ) { }

    @ViewChild(ModalComponent) modal: ModalComponent;

    ticket: ITicket;
    customer: ICustomer;

    setData(ticket: ITicket, admin: string, manager: string) {
        // console.log(ticket);
        this.ticket = ticket;
        this.ticket['admin'] = admin;
        this.ticket['manager'] = manager;
        if(ticket.customer){
            this.getCusInfo(ticket.customer.id);
        }
        this.modal.Open();
    }

    closeModal(){
        this.ticket = null;
        this.modal.Close();
    }

    getCusInfo(id: string){
        this.customerService.GetCustomerByID(id).subscribe(v => {
            this.customer = v;
        });
    }

   
}
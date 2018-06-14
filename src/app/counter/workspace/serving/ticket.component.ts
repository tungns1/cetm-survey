import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { TimerComopnent, ProjectConfig, Ticket, WorkspaceService, CacheService, ServiceName, TicketService } from '../shared';
import { ShowLoading, HideLoading } from '../../../../lib/backend';

@Component({
    selector: 'ticket',
    templateUrl: 'ticket.component.html',
    styleUrls: ['emptyAndTicket.component.scss']
})
export class TicketComponent {
    @Input() ticket: Ticket;
    maxServingMinute = ProjectConfig.service.max_serving_minute;
    listService = [];
    showList = false;

    constructor(private workspaceService: WorkspaceService, private ticketService: TicketService){}

    ngOnInit(){
        this.workspaceService.services$.subscribe(v => {
            v.forEach(item => {
                if(this.listService.indexOf(item) == -1){
                    this.listService.push(Object.assign({
                        id: item.id,
                        name: item.name
                    }))
                }
            })
        })
    }

    toggleList(){
        this.showList = !this.showList;
    }

    addService(id){
        this.showList = false
        
        if(id){
            this.ticketService.Move(this.ticket, [id],[]).subscribe(v => {
                ShowLoading();
            })
            this.ticketService.TriggerAction('call',this.ticket).subscribe(v => {
                HideLoading();
            })
        }
        
    }
}


import { Component } from '@angular/core';
import { QueueService } from '../service';
import { Model } from '../../shared/';
@Component({
    selector: 'info-customer',
    templateUrl: 'info.component.html'
})

export class InfoComponent {
    constructor(private queueService: QueueService) { }
    ticket:Model.House.ITicket
    ngOnInit(){
  this.queueService.serving$.map(v=>v[0]).subscribe(v=>{
          this.ticket=v;
    });
    }

}
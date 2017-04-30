import { Pipe } from '@angular/core';
import { ITicket } from '../model/';
import { TRANSACTION } from "../../../const/transaction";

@Pipe({
    name: 'ticketState'
})
export class TicketStatePipe {
    transform(t: ITicket) {
        return `State ${t.state}`;
    }
}


@Pipe({
    name: 'ticketStateFinish'
})
export class TicketStateFinishPipe {
    transform(t: ITicket) {
        if(TRANSACTION.ATTENDED){
           if(t.stime>TRANSACTION.SERVING_TIME){
             
           }else{

           }
        }
        return `State ${t.state}`;
    }
}
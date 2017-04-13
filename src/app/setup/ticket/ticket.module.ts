import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketComponent } from './ticket.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PriorityComponent } from "./priovity/priority.component";
import { SetupAPI } from "./ticket.service";


const routing = RouterModule.forChild([
    {
        path: '',
        component: TicketComponent
    }
]);

@NgModule({
    imports: [routing, ReactiveFormsModule, FormsModule,
        CommonModule
    ],
    declarations: [TicketComponent,PriorityComponent],
    providers:[SetupAPI]
    
})
export class TicketModule { }

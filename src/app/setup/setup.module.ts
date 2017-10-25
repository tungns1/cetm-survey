import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SetupComponent } from "./setup.component";
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { SetupGlobalModule } from "./setup-global/setup-global.module";
import { routing } from "./setup.routing";
import { ServiceModule } from "./service/service.module";
import { TicketModule } from "./ticket/ticket.module";


@NgModule({
  imports: [routing,ReactiveFormsModule ,FormsModule,SetupGlobalModule,ServiceModule,TicketModule,
    CommonModule
  ],
  declarations: [SetupComponent]
})
export class SetupModule { }

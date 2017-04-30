import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TimeComponent } from "./time/time.component";
import { SetupAPI } from "./transaction.service";


const routing = RouterModule.forChild([
    {
        path: '',
        component: TransactionComponent
    }
]);

@NgModule({
    imports: [routing, ReactiveFormsModule, FormsModule,
        CommonModule
    ],
    declarations: [TransactionComponent,TimeComponent],
    providers:[SetupAPI]
    
})
export class TransactionModule { }

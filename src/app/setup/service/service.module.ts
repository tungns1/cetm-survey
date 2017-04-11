import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TimeComponent } from "./time/time.component";
import { SetupAPI } from "./service.service";


const routing = RouterModule.forChild([
    {
        path: '',
        component: ServiceComponent
    }
]);

@NgModule({
    imports: [routing, ReactiveFormsModule, FormsModule,
        CommonModule
    ],
    declarations: [ServiceComponent,TimeComponent],
      providers:[SetupAPI]
})
export class ServiceModule { }

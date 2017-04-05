import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SetupComponent } from './setup/setup.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';


const routing = RouterModule.forChild([
  { path: '', component: SetupComponent }
]);

@NgModule({
  imports: [routing,ReactiveFormsModule ,FormsModule,
    CommonModule
  ],
  declarations: [SetupComponent]
})
export class SetupModule { }

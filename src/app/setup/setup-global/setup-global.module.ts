import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SetupGlobalComponent } from './setup-global.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LanguageComponent } from "./language/language.component";
import { SetupAPI } from "./setup-global.service";


const routing = RouterModule.forChild([
    {
        path: '',
        component: SetupGlobalComponent
    }
]);

@NgModule({
    imports: [routing, ReactiveFormsModule, FormsModule,
        CommonModule
    ],
    declarations: [SetupGlobalComponent,LanguageComponent],
    providers:[SetupAPI]
})
export class SetupGlobalModule { }

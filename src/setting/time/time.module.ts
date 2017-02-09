import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeComponent } from './time.component';
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { I18n } from '../../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: TimeComponent
    }
]);


@NgModule({
    imports: [routing, CommonModule, I18n.TranslateModule,ReactiveFormsModule,FormsModule],
    declarations: [TimeComponent]
})
export class TimeModule {

}
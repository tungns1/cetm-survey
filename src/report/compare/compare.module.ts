import { NgModule } from '@angular/core';
import {
   CompareComponent
} from './compare.component';


import { Routes, RouterModule } from '@angular/router'

const routing = RouterModule.forChild([
    {
        path: '',
        component: CompareComponent
    }
]);


@NgModule({
    imports: [routing],
    declarations: [
       CompareComponent
    ]
})
export default class ReportCompareModule {

}
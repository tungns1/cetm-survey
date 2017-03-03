import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { Routes, RouterModule } from '@angular/router'
import { I18n } from '../../shared';

const routing = RouterModule.forChild([
    {
        path: '',
        component: FileComponent
    }
]);


@NgModule({
    imports: [routing, CommonModule, I18n.TranslateModule],
    declarations: [FileComponent]
})
export class FileModule {

}
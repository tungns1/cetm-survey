import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from '@angular/material';
import { ArrayFormComponent } from './array-form.component';
import { Ng2BasicModule } from '../../../shared';

@NgModule({
    imports: [FormsModule, CommonModule, FlexLayoutModule],
    declarations: [ArrayFormComponent],
    exports: [ArrayFormComponent]
})
export class ArrayFormModule {

}

import { L10nFormComponent } from './i18n-form.component';
import { L10nTicketComponent } from './i18n-ticket.component';
import { RichEditorModule } from '../../../../x/ng/rich-editor/rich-editor.module';

@NgModule({
    imports: [FormsModule, CommonModule, RichEditorModule, FlexLayoutModule, Ng2BasicModule],
    declarations: [L10nFormComponent, L10nTicketComponent],
    exports: [L10nFormComponent, L10nTicketComponent]
})
export class CultureModule {

}


import { JSONFormComponent } from './json-form.component';

@NgModule({
    imports: [FormsModule, CommonModule, FlexLayoutModule, MaterialModule],
    declarations: [JSONFormComponent],
    exports: [JSONFormComponent]
})
export class JSONFormModule {

}

@NgModule({
    exports: [
        ArrayFormModule, JSONFormModule,
        CultureModule
    ]
})
export class AdminFormModule {

}
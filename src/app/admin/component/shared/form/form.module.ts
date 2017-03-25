
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArrayFormComponent } from './array-form.component';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [ArrayFormComponent],
    exports: [ArrayFormComponent]
})
export class ArrayFormModule {

}

import { L10nFormComponent } from './i18n-form.component';
import { L10nTicketComponent } from './i18n-ticket.component';
import { RichEditorModule } from '../../../../x/ng/rich-editor/rich-editor.module';

@NgModule({
    imports: [FormsModule, CommonModule,RichEditorModule],
    declarations: [L10nFormComponent,L10nTicketComponent],
    exports: [L10nFormComponent,L10nTicketComponent]
})
export class CultureModule {

}


import { JSONFormComponent } from './json-form.component';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [JSONFormComponent],
    exports: [JSONFormComponent]
})
export class JSONFormModule {

}

import { UIFormComponent } from './ui-form.component';

@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [UIFormComponent],
    exports: [UIFormComponent]
})
export class UIFormModule {

}

@NgModule({
    exports: [
        ArrayFormModule, JSONFormModule, UIFormModule,
        CultureModule
    ]
})
export class AdminFormModule {

}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ArrayFormComponent } from './array-form.component';
import { Ng2BasicModule } from '../../../shared';
import { QuestionFormComponent } from './question-form/question-form.component';

@NgModule({
    imports: [FormsModule, CommonModule, FlexLayoutModule],
    declarations: [ArrayFormComponent],
    exports: [ArrayFormComponent]
})
export class ArrayFormModule {

}

import { AttributeListFormComponent } from './attr-list-form.component';

@NgModule({
    imports: [FormsModule, CommonModule, FlexLayoutModule],
    declarations: [AttributeListFormComponent],
    exports: [AttributeListFormComponent]
})
export class AttributeListFormModule {

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
    imports: [FormsModule, CommonModule, FlexLayoutModule, MatButtonModule],
    declarations: [JSONFormComponent],
    exports: [JSONFormComponent]
})
export class JSONFormModule {

}

@NgModule({
    imports: [
        CommonModule, FlexLayoutModule, FormsModule,
        MatCheckboxModule, ReactiveFormsModule
    ],
    declarations: [QuestionFormComponent],
    exports: [
        ArrayFormModule, JSONFormModule,
        CultureModule, AttributeListFormModule,
        QuestionFormComponent
    ]
})
export class AdminFormModule {

}
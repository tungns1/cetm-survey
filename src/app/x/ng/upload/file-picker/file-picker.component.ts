import {
    Component, Input, forwardRef, ExistingProvider,
    Output, EventEmitter, HostListener
} from '@angular/core';
import {
    FormsModule, ControlValueAccessor,
    NG_VALUE_ACCESSOR, AbstractControl,
    FormArray, FormControl
} from '@angular/forms';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { FilePickerModalComponent } from './file-picker-modal.component';

const FILE_PICKER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilePickerComponent),
    multi: true
}


@Component({
    selector: 'file-picker',
    template: `
        <input class="edit-image margin-top" [(ngModel)]="value"/> 
        <br>
        <button class="hlm-button margin-top" (click)="openModal()">Chọn</button>
    `,

    providers: [FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class FilePickerComponent implements ControlValueAccessor {
    constructor(
        private mdDialog: MdDialog
    ) { }

    @HostListener("change") onChange() {
        this.onChangeCallback(this.value);
    }

    protected value = '';
    protected onChangeCallback = (v) => { };

    writeValue(data: string) {
        this.value = data;
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {

    }

    openModal() {
        const config = new MdDialogConfig();
        config.width = '450px';
        config.data = {
            value: this.value
        };
        const dialog = this.mdDialog.open(FilePickerModalComponent, config);
        dialog.afterClosed().subscribe(v => {
            if (v) {
                this.value = v;
                this.onChangeCallback(this.value);
            }
        })
    }
}

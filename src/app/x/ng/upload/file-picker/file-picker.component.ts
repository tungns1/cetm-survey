import {
    Component, Input, forwardRef, ExistingProvider,
    Output, EventEmitter, HostListener
} from '@angular/core';
import {
    FormsModule, ControlValueAccessor,
    NG_VALUE_ACCESSOR, AbstractControl,
    FormArray, FormControl
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FilePickerModalComponent } from './file-picker-modal.component';

const FILE_PICKER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilePickerComponent),
    multi: true
}


@Component({
    selector: 'file-picker',
    template: `
        <div fxLayout="row" fxLayoutGap="10px">
            <input fxFlex class="ctrlInput" [(ngModel)]="value" />
            <button fxFlex="23%" class="btnFill ctrlInput" (click)="openModal()" i18n>Select</button>
        </div>
    `,

    providers: [FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class FilePickerComponent implements ControlValueAccessor {
    constructor(
        private mdDialog: MatDialog
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
        const config = new MatDialogConfig();
        config.width = '500px';
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

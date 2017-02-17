import { Component, Input, forwardRef, ExistingProvider, Attribute } from '@angular/core';

import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AbstractControl } from '@angular/forms';

import { FileNode } from '../backend/';

const FILE_PICKER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FilePickerComponent),
    multi: true
}

import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'file-picker',
    template: `
        <input class="hlm-input hl-input-filemulti inputs" [(ngModel)]="value" (change)="setValue($event)" /> 
        <button class="hlm-button" (click)="modal.Open()">Chọn</button>
        <modal #modal>
            <div class="file-browser">
            <button class="btn-hlm btn-close" (click)="modal.Close()">Close</button>
            <file-browser (select)="choose($event)"></file-browser>
            </div>
        </modal>
    `,
   
    providers: [FILE_PICKER_CONTROL_VALUE_ACCESSOR]
})
class FilePickerComponent implements ControlValueAccessor {

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

    OnChange() {
        setTimeout(_ => this.onChangeCallback(this.value));
    }

    setValue(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.value = e.target['value'];
        this.OnChange();
    }

    choose(node: FileNode) {
        this.value = node.path;
        this.OnChange();
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileBrowserModule } from '../file-browser/file-browser.module';
import { ModalModule } from '../../modal/';

@NgModule({
    imports: [FormsModule, CommonModule, FileBrowserModule, ModalModule],
    declarations: [FilePickerComponent],
    exports: [FilePickerComponent]
})
export class FilePickerModule {

}

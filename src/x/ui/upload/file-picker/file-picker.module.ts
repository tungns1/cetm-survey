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
        <input class="hlm-input inputs" [(ngModel)]="value" (change)="setValue($event)" /> 
        <button class="hlm-button" (click)="modal.Open()">Chọn</button>
        <modal #modal>
            <div class="file-browser">
            <button class="btn-hlm btn-close" (click)="modal.Close()">Close</button>
            <file-browser (select)="choose($event)"></file-browser>
            </div>
        </modal>
    `,
    styles: [`
    .file-browser {
        width: 100%;
    }
    .hlm-button{
        opacity:0.7;
    }
    .hlm-input{
        width:78%;
    }
    .btn-close{
    background-color: #AA0000;
	border-color: rgba(0,0,0,0.3);
	text-shadow: 0 1px 0 rgba(0,0,0,0.5);
	color: #FFF;
    padding: 2px 15px 2px 15px;
    }
    	.btn-close:hover {
		background-color: #AA0000;
		border-color: rgba(0,0,0,0.5);
	}
	
	.btn-close:active {
		background-color: #AA0000;
		border-color: rgba(0,0,0,0.9);
	}
    `],
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

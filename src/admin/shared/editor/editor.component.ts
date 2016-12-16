import { Component, Input, Output, EventEmitter, ViewChild, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Backend } from '../../../shared/';
import { ModalComponent } from '../../../x/ui/modal/';

interface IEditService<T> {
    api: Backend.HttpApi<T>;
    refresh: () => void;
    form: (u?: T) => FormGroup; 
}

@Component({
    selector: "editor-title",
    template: `<ng-content></ng-content>`
})
export class EditorTitleComponent {}

@Component({
    selector: 'editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.scss']
})
export class EditorComponent<T> {
    @Input() name = "";
    err='';

    @Input() data: any[] = [];
    @Input() fields: { title: string, name: string }[] = [];

    @Input() service: IEditService<T>;

    private form: FormGroup;
    private current: T;

    @Output() edit = new EventEmitter<FormGroup>();

    private Refresh() {
        this.service.refresh();
    }

    @ViewChild("edit") editorRef: ModalComponent;
    @ViewChild("remove") removeRef: ModalComponent;

    onAdd() {
        this.current = null;
        this.form = this.service.form();
        this.form.updateValueAndValidity({onlySelf: false, emitEvent: true});
        this.editorRef.Open();
        this.edit.next(this.form);
    }

    onEdit(u: T) {
        this.current = u;
        this.form = this.service.form(u);
        this.form.updateValueAndValidity({onlySelf: false, emitEvent: true});
        this.editorRef.Open();
        this.edit.next(this.form);
    }

    onRemove(u: T) {
        this.removeRef.Open();
        this.form = this.service.form(u);
    }

    CloseEditor() {
        this.editorRef.Close();
    }

    CloseRemove() {
        this.removeRef.Close();
    }

    Create() {
        this.service.api.Create(this.form.value).subscribe(_ => {
            Success("Lưu thành công");
            this.Refresh();
            this.editorRef.Close();
        }, err => {
            this.err=err;
            Error(err);
        });
    }

    Delete() {
        this.service.api.MarkDelete(this.form.value.id).subscribe(_ => {
            Success("Xóa thành công");
            this.removeRef.Close();
            this.Refresh();
        }, err => {
            this.err=err;
            Error(err);
        });
    }

    Update() {
        this.service.api.Update(this.form.value).subscribe(_ => {
            Success("Sửa thành công");
            this.Refresh();
            this.editorRef.Close();
        },  err => {
            this.err=err;
            Error(err);
        });
    }
}


function Error(message: string) {
    console.log(message);
}

function Success(message: string) {
    console.log(message);
}
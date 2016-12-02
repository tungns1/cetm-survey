import { Component, Input, Output, EventEmitter, ViewChild, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Backend } from '../../../shared/';
import { ModalComponent } from './modal.component';

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

    @Input() data: any[] = [];
    @Input() fields: { title: string, name: string }[] = [];

    @Input() service: IEditService<T>;

    private form: FormGroup;
    private current: T;

    @Output() edit = new EventEmitter<T>();
    @Output() create = new EventEmitter();

    private Refresh() {
        this.service.refresh();
    }

    @ViewChild("edit") editorRef: ModalComponent;
    @ViewChild("remove") removeRef: ModalComponent;

    onAdd() {
        this.current = null;
        this.form = this.service.form();
        this.editorRef.Open();
    }

    onEdit(u: T) {
        this.current = u;
        this.form = this.service.form(u);
        this.editorRef.Open();
    }

    onRemove(id: string) {
        this.removeRef.Open();
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
        }, err => Error(err.error));
    }

    Delete(id: string) {
        this.service.api.MarkDelete(id).subscribe(_ => {
            Success("Xóa thành công");
            this.removeRef.Close();
            this.Refresh();
        }, err => {
            Error(err.error);
        });
    }

    Update() {
        this.service.api.Update(this.form.value).subscribe(_ => {
            Success("Sửa thành công");
            this.Refresh();
            this.editorRef.Close();
        }, err => {
            Error(err.error);
        });
    }
}


function Error(message: string) {
    console.log(message);
}

function Success(message: string) {
    console.log(message);
}
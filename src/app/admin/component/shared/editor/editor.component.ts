import { Component, Input, Output, EventEmitter, ViewChild, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { SharedService, Lib } from '../../../shared/';
import { CrudApiService, IField } from '../../shared';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: "editor-title",
    template: `<ng-content></ng-content>`
})
export class EditorTitleComponent { }

@Component({
    selector: 'editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.scss']
})
export class EditorComponent<T> {

    @Input() name: string;
    @Input() set service(s: CrudApiService<T>) {
        this.api = s;
        this.name = this.name || this.api.Name;
        this.listFields = this.api.ListFields;
        this.listView$ = this.api.RxListView;
    };
    @Input() makeForm: (u?: T) => FormGroup;
    @Output() edit = new EventEmitter<T>();

    @ViewChild("edit") editorRef: Lib.Ng.ModalComponent;
    @ViewChild("remove") removeRef: Lib.Ng.ModalComponent;


    private formSub: ISubscription;

    private createForm(v?: T) {
        this.current = v;
        this.form = this.makeForm(v);
        if (this.formSub) {
            this.formSub.unsubscribe();
        }

        if (v) {
            this.edit.next(v);
        }
        
        this.formSub = this.form.valueChanges.subscribe(d => this.edit.next(d));
        this.form.updateValueAndValidity({ onlySelf: false, emitEvent: true });
        this.editorRef.Open();
    }

    private onAdd() {
        this.createForm();
        this.editorRef.Open();
    }

    private onEdit(u: T) {
        this.createForm(u);
        this.editorRef.Open();
    }

    private onRemove(u: T) {
        this.removeRef.Open();
        this.form = this.makeForm(u);
    }

    private CloseEditor() {
        this.editorRef.Close();
    }

    private CloseRemove() {
        this.removeRef.Close();
    }

    private Create() {
        this.api.Create(this.form.value).subscribe(_ => {
            Success("Thêm thành công");
            this.editorRef.Close();
        }, err => {
            this.err = err;
            Error(err);
        });
    }

    private Delete() {
        this.api.MarkDelete(this.form.value.id).subscribe(_ => {
            Success("Xóa thành công");
            this.removeRef.Close();
        }, err => {
            this.err = err;
            Error(err);
        });
    }

    private Update() {
        this.api.Update(this.form.value).subscribe(_ => {
            Success("Sửa thành công");
            this.editorRef.Close();
        }, err => {
            this.err = err;
            Error(err);
        });
    }


    private api: CrudApiService<T>;
    private form: FormGroup;
    private current: T;

    private err = '';

    private listView$: Observable<T[]>;
    private listFields: IField[];
}


function Error(message: string) {
    const toast = new Lib.Ui.Notification.Toast;
    toast.Title('Lỗi').Error(message).Show();
}

function Success(message: string) {
    const toast = new Lib.Ui.Notification.Toast;
    toast.Title('Thành công').Info(message).Show();
}
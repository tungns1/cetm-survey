import {
    Component, Input, Output, EventEmitter, ViewChild,
    ContentChildren, QueryList, AfterContentInit
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { ModalComponent, Toast } from '../../../shared/';
import { CrudApiService } from '../../shared';
import { ISubscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "editor-title",
    template: `<ng-content></ng-content>`
})
export class EditorTitleComponent { }


import { ITableField, ITableAction } from './model';

@Component({
    selector: "editor-field",
    template: `<ng-content></ng-content>`
})
export class EditorFieldComponent implements ITableField {
    @Input() name: string;
    @Input() title: string;
}

@Component({
    selector: 'editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.scss']
})
export class EditorComponent<T> {

    constructor(
        private route: ActivatedRoute
    ) { }

    @Input() name: string;
    @Input() set service(s: CrudApiService<T>) {
        this.api = s;
        this.listView$ = this.api.RxListView;
    };
    @Input() makeForm: (u?: T) => FormGroup;
    @Output() edit = new EventEmitter<T>();

    @ViewChild("edit") editorRef: ModalComponent;
    @ViewChild("remove") removeRef: ModalComponent;
    @ContentChildren(EditorFieldComponent) fields: QueryList<EditorFieldComponent>;

    ngAfterContentInit() {
        this.listFields = this.fields.toArray();
    }


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

    private onAction(e: ITableAction) {
        if (e.action === 'add') {
            this.createForm();
            this.editorRef.Open();
        } else if (e.action === 'remove') {
            this.removeRef.Open();
            this.form = this.makeForm(e.value);
        } else if (e.action === 'edit') {
            const id = e.value['id'];
            this.api.GetByID(id).first()
                .subscribe(u => {
                    this.createForm(u);
                    this.editorRef.Open();
                });
        }
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
            this.err = err.message;
            Error(err.message);
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
    private listFields: EditorFieldComponent[];
}


function Error(message: string) {
    const toast = new Toast;
    toast.Title('Lỗi').Error(message).Show();
}

function Success(message: string) {
    const toast = new Toast;
    toast.Title('Thành công').Info(message).Show();
}
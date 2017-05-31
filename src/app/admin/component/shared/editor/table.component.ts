import {
    Component, OnInit, Input, Output, EventEmitter,
    ContentChildren, QueryList, ChangeDetectorRef
} from '@angular/core';
import { ITableField, ITableAction } from './model';

@Component({
    selector: "app-table-field",
    template: `<ng-content></ng-content>`
})
export class AppTableFieldComponent implements ITableField {
    @Input() name: string;
    @Input() title: string;
}

@Component({
    selector: 'app-datatable',
    templateUrl: 'table.component.html',
    styleUrls: ['editor.component.scss']
})
export class AppDataTableComponent implements OnInit {

    constructor(
        // private ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        // this.ref.markForCheck();
    }

    @Input() fields: ITableField[] = [];
    @Input() data: any[] = [];
    @Input() name: string;
    @Output() action = new EventEmitter<ITableAction>();

    ngAfterContentInit() {
        if (this.fields.length < 1) {
            this.fields = this.children.toArray();
        }
    }

    onAction(action: string, value: any) {
        // if(action === 'remove'){
        //     this.removeRef.Open();
        //     this.form = this.makeForm(value);
        // } else
        // console.log('aaa');
        this.action.emit({action, value});
        // if (e.action === 'add') {
        //     this.createForm();
        //     this.editorRef.Open();
        // } else if (e.action === 'remove') {
        //     this.removeRef.Open();
        //     this.form = this.makeForm(e.value);
        // } else if (e.action === 'edit') {
        //     const id = e.value['id'];
        //     this.api.GetByID(id).first()
        //         .subscribe(u => {
        //             this.createForm(u);
        //             this.editorRef.Open();
        //         });
        // }
    }

    @ContentChildren(AppTableFieldComponent) children: QueryList<AppTableFieldComponent>;
}
import {
    Component, OnInit, Input, Output, EventEmitter,
    ContentChildren, QueryList, ChangeDetectorRef, ViewChild
} from '@angular/core';
import { ITableField, ITableAction } from './model';
import { CacheBranch } from '../';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { NoticeComponent } from '../../../../../lib/ng2';
import { RuntimeEnvironment } from '../../shared';

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

    constructor(private env: RuntimeEnvironment,
    ) { 
         this.env.Auth.User$.subscribe(u => {
           this.adminRoot= CacheBranch.GetLevelForID(u.branch_id);
       });
    }

    @ContentChildren(AppTableFieldComponent) children: QueryList<AppTableFieldComponent>;
    @Input() fields: ITableField[] = [];
    @Input() data: any[] = [];
    @Input() name: string;
    @Input() canEdit: boolean = true;
    @Output() action = new EventEmitter<ITableAction>();
    @ViewChild(NoticeComponent) notice: NoticeComponent;
    adminRoot=0;
    canDelete: boolean = true;

    ngOnInit() {
        console.log("dasda")
        if (!this.canEdit && this.adminRoot!=3) {
            this.canDelete = false;
        }
    }

    ngAfterContentInit() {
        if (this.fields.length < 1) {
            this.fields = this.children.toArray();
        }
    }

    onAction(action: string, value: any) {
        if (!this.canEdit && this.adminRoot!=3) {
            if (action === 'add') {
                this.notice.ShowMessage("dont_have_authorize");
            }
            else this.action.emit({ action, value });
        } else this.action.emit({ action, value });
    }
}
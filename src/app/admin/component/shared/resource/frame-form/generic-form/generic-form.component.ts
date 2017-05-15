import {
  Component, OnInit, ViewChild,
  Output, EventEmitter, Optional,
  Inject, forwardRef, ExistingProvider
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IResourceForm } from '../../shared';
import { cloneDeep } from 'lodash';
import { BaseFormComponent } from '../shared';

const GENERIC_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GenericFormComponent),
  multi: true
}

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})

export class GenericFormComponent {
  /**
   * Safely clone the obj
   * @param obj the given object
   */
  constructor(
    @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
    private dialog: MdDialogRef<GenericFormComponent>,
  ) {
    this.record = cloneDeep(this.dialogData);
    this.type = this.record.type;
  }

  record: IResourceForm;
  type: string;

  Save() {
    // console.log(this.)
    if (!this.record) {
      return;
    }
    console.log(this.record);
    this.dialog.close(this.record);
  }

  close() {
    this.dialog.close(null)
  }

}
import {
  Component, Optional, Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IResourceForm } from '../../shared';
import { cloneDeep } from 'lodash';

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
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialog: MatDialogRef<GenericFormComponent>,
  ) {
    this.record = cloneDeep(this.dialogData);
  }

  record: IResourceForm;
  disableEditTextArea: boolean = true;

  Save() {
    this.dialog.close(this.record);
  }

  Cancel() {
    this.dialog.close(null)
  }

}
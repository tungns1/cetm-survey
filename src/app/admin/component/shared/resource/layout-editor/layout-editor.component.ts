import {
  Component, EventEmitter, Optional,
  Inject, forwardRef, ExistingProvider, OnInit, AfterViewInit
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IResourceForm } from '../shared';
import { UI } from '../../../shared'
import { cloneDeep } from 'lodash';
import { GenericFormComponent } from '../frame-form/generic-form/generic-form.component';

const GENERIC_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LayoutEditorComponent),
  multi: true
}

@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.scss']
})
export class LayoutEditorComponent {
  /**
     * Safely clone the obj
     * @param obj the given object
     */
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialog: MatDialogRef<LayoutEditorComponent>,
    private mdDialog: MatDialog,
  ) {
    this.layout = cloneDeep(this.dialogData);
  }

  private backgroundColor: string = '';
  private textColor: string = '';
  layout: UI;

  backgroundPosX: string = '';
  backgroundPosY: string = '';
  // layoutGroup = []
  // records

  ngOnInit() {
    this.backgroundColor = this.layout.style.backgroundColor || '';
    this.textColor = this.layout.style.color || '';

    if (this.layout.style.backgroundImage) {
      this.layout.style.backgroundImage = this.layout.style.backgroundImage.replace('url(', '').replace(')', '')
      if (this.layout.style.backgroundPosition){
        let pos = this.layout.style.backgroundPosition.split(' ');
        this.backgroundPosX = pos[0];
        this.backgroundPosY = pos[1];
      }
    }
  }


  save() {
    if (this.layout.style.backgroundImage) {
      this.layout.style.backgroundSize = 'cover';
      this.layout.style.backgroundRepeat = 'no-repeat';
      if (this.layout.style.backgroundImage.indexOf('url(') === -1) {
        this.layout.style.backgroundImage = 'url(' + this.layout.style.backgroundImage + ')'
      }
    }

    this.dialog.close(this.layout);
  }

  changeBackgroundColor(color: string) {
    this.layout.style.backgroundColor = color
  }

  changeTextColor(color: string) {
    this.layout.style.color = color;
  }


  cancel() {
    this.dialog.close(null)
  }

  getBackgroundPos() {
    this.layout.style.backgroundPosition = this.backgroundPosX + ' ' + this.backgroundPosY;
  }

}

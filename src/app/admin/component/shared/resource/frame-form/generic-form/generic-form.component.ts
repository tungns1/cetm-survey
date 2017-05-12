import { Component, OnInit, ViewChild, Output, EventEmitter, Optional, Inject } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {
  ModalComponent, IResourceForm
} from '../../shared';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {

  constructor(
    @Optional() @Inject(MD_DIALOG_DATA) private dialogData: any,
    private dialog: MdDialog,
  ) { }

  record: IResourceForm;
  type: string;

  @Output() save = new EventEmitter();

  // @ViewChild("main") modal: ModalComponent;

  ngOnInit() {
    // console.log('aaaaaaaaaaaaa');
    // console.log(this.dialogData);
    this.record = this.dialogData;
    this.record = cloneDeep(this.dialogData);
    this.type = this.dialogData.type;
  }

  Save() {
    if (!this.record) {
      return;
    }
    this.save.next(this.record);
    this.dialog.closeAll();
  }

  close(){
    this.dialog.closeAll();
  }

}

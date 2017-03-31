import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

  ngOnInit() {
  }

  Edit(record: IResourceForm) {
    this.record = cloneDeep(record);
    this.type = record.type;
    this.modal.Open();
  }

  Close() {
    this.record = null;
    this.modal.Close();
  }

  Save() {
    if (!this.record) {
      return;
    }
    this.save.next(this.record);
    this.Close();
  }

  record: IResourceForm;
  type: string;

  @Output() save = new EventEmitter();

  @ViewChild("main") modal: ModalComponent;

}

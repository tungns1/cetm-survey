import { Component, OnInit, forwardRef, ExistingProvider, Optional, Inject } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface II18n {
  vi?: string;
  en?: string;
  sp?: string;
}

const REPEATER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RepeaterFormComponent),
  multi: true
}

interface IRepeaterForm {
  data: {
    row: number;
    column: number;
    limit: number;
    template_name: string;
    repeat?: any[]
  };
  style: any;
}

@Component({
  selector: 'app-repeater-form',
  templateUrl: './repeater-form.component.html',
  styleUrls: ['./repeater-form.component.scss'],
  providers: [REPEATER_CONTROL_VALUE_ACCESSOR]
})
export class RepeaterFormComponent extends BaseFormComponent<IRepeaterForm> {

  constructor(
    private mdDialog: MatDialog
  ) {
    super();
  }
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  keyRepeatArr: string[] = [];


  ngOnInit() {

  }

  writeValue(v: IRepeaterForm) {
    if(v && !v.style){
      v.style = {}
    }
    super.writeValue(v);

    if (this.value && this.value.data.repeat) {
      for (var key in this.value.data.repeat[0]) {
        if (this.value.data.repeat[0].hasOwnProperty(key)) {
          this.keyRepeatArr.push(key);
        }
      }
    }
  }

  protected clone(obj: any): IRepeaterForm {
    if(obj && !obj.style){
      obj.style = {}
    }
    return super.clone(obj);
  }

  add() {
    var newobj: object = {}
    this.keyRepeatArr.forEach(key => {
      newobj[key] = '';
    });
    this.value.data.repeat.push(newobj)
    this.onChangeCallback(this.value);
  }

  deleteItem(index: number) {
    this.value.data.repeat.splice(index, 1);
    this.onChangeCallback(this.value);
  }

  editI18n(index: number, i18n: II18n) {
    if (!i18n) {
      i18n = {};
      let keys = Object.keys(this.value.data.repeat[0].i18n);
      keys.forEach(element => {
        i18n[element] = ''
      });
    }
    const config = new MatDialogConfig();
    config.width = '500px';
    config.data = i18n || this.value.data.repeat[0].i18n;
    const dialog = this.mdDialog.open(I18nModalComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.value.data.repeat[index].i18n = d;
        this.onChangeCallback(this.value);
      }
    })
  }

}

/**********************************************************/


@Component({
  selector: 'app-i18n-modal',
  template: `
  <div id="i18nModal">
    <h1 class="modal-header">Edit i18n</h1>
    <div class="padding-20">
      <div fxLayout="row" fxLayoutGap="10px" *ngFor="let el of data; let i = index">
        <span fxFlex="22%" class="padding-t-5 right">{{el.key}}</span>
        <input fxFlex="68%" class="ctrlInput" type="text" [(ngModel)]="el.value">
      </div>
    
      <div fxLayout="row" fxLayoutGap="10px">
        <button fxFlex class="btnClear" (click)="Cancel()">Cancel</button>
        <button fxFlex class="btnFill" (click)="Save()">Ok</button>
      </div>
    </div>
  </div>
  `,
})

export class I18nModalComponent {

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialog: MatDialogRef<II18n>,
  ) { }

  data: any[];

  ngOnInit() {
    this.data = Object.keys(this.dialogData).map(key => {
      return {
        key: key,
        value: this.dialogData[key]
      }
    });
  }

  Save() {
    let result = {};
    this.data.forEach(element => {
      result[element.key] = element.value;
    });
    this.dialog.close(result);
  }

  Cancel() {
    this.dialog.close(null)
  }

}
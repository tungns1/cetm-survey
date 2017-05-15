import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { GenericFormComponent } from '../frame-form/generic-form/generic-form.component';
import { ILayoutResources, IResourceForm } from '../shared';

const RESORCE_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ResourceEditorComponent),
  multi: true
}

@Component({
  selector: 'app-resource-editor',
  templateUrl: 'resource-editor.component.html',
  styleUrls: ['resource-editor.component.scss'],
  providers: [RESORCE_CONTROL_VALUE_ACCESSOR]
})
export class ResourceEditorComponent implements OnInit, ControlValueAccessor {

  constructor(
    private mdDialog: MdDialog
  ) { }

  private onChangeCallback = (data: ILayoutResources) => { }

  value: ILayoutResources = {};
  records: IResourceForm[];

  private editables = ["text", "image", "videos", 'repeater'];

  ngOnInit() {
    this.refresh();
  }

  Save(r: IResourceForm) {
    this.value[r.name] = r;
    this.refresh();
    this.onChangeCallback(this.value);
  }

  Reset(r: IResourceForm) {
    delete this.value[r.name];
    this.refresh();
    this.onChangeCallback(this.value);
  }

  refresh() {
    this.records = Object.keys(this.value).map(k => {
      const r = this.value[k];
      const editable = this.editables.indexOf(r.type) !== -1;
      return {
        name: k,
        editable: editable,
        type: r.type,
        data: r.data
      };
    }).sort((a, b) => a.name < b.name ? -1 : 1);
  }
  
  /**
     * Write a new value to the element.
     */
  writeValue(obj: any) {
    this.value = obj || {};
    this.refresh();
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any) {

  }

  edit(record: IResourceForm) {
    const config = new MdDialogConfig();
    config.width = '350px';
    config.data = record;
    const dialog = this.mdDialog.open(GenericFormComponent, config);
    dialog.afterClosed().subscribe(d => {
      if(d){
        this.Save(d);
      }
    })
  }

}

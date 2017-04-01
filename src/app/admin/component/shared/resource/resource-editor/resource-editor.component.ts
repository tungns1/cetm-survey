import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const RESORCE_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ResourceEditorComponent),
  multi: true
}

import { ILayoutResources, IResourceForm } from '../shared';

@Component({
  selector: 'app-resource-editor',
  templateUrl: './resource-editor.component.html',
  styleUrls: ['./resource-editor.component.scss'],
  providers: [RESORCE_CONTROL_VALUE_ACCESSOR]
})
export class ResourceEditorComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  ngOnInit() {
    this.refresh();
  }

  value: ILayoutResources = {};
  records: IResourceForm[];

  Save(r: IResourceForm) {
    this.value[r.name] = r;
    this.refresh();
    this.onChangeCallback(this.value);
  }

  Reset(r: IResourceForm) {
    this.value[r.name].data = null;
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

  private onChangeCallback = (data: ILayoutResources) => { }

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

  private editables = ["text", "image", "videos"];

}

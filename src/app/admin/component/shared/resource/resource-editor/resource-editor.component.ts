import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GenericFormComponent } from '../frame-form/generic-form/generic-form.component';
import { UIEditorComponent } from '../ui-editor/ui-editor.component'
import { ILayoutResources, IResourceForm } from '../shared';
import { UI } from '../../../shared'

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
    private mdDialog: MatDialog
  ) { }

  private onChangeCallback = (data: UI) => { }

  value: UI = {
    style: {},
    layout: {},
    resources: {},
    navigations: {},
    language: '',
  };
  records: IResourceForm[];
  header: any;

  private editables = ["text", "image", "repeater", "videos", 'slider'];
  private mainComponent = ['Header', 'Body', 'Footer'];

  ngOnInit() {
    this.refresh();
    // this.test();
  }

  Save(ui: UI) {
    this.value = ui;
    this.refresh();
    this.onChangeCallback(this.value);
  }

  enable(ui: UI) {
    this.value = ui;
    this.onChangeCallback(this.value);
  }

  Reset(ui: UI) {
    delete this.value;
    this.refresh();
    this.onChangeCallback(this.value);
  }

  refresh() {
    if (this.value.resources && this.value.layout)
      this.records = Object.keys(this.value.resources)
        .filter(k => {
          return this.editables.indexOf(this.value.resources[k].type) !== -1
        })
        .map(k => {
          const r = this.value.resources[k];
          return {
            name: k,
            type: r.type,
            data: r.data,
            style: r.style,
            enabled: r.enabled
          };
        }).sort((a, b) => a.name < b.name ? -1 : 1);
    if (this.value.layout.children) {
      this.value.layout.children.map(element => {
        if(!element.style)
          element.style = {}
      });
      this.header = this.value.layout.children.find(comp => {
        return comp.name = 'Header';
      })
    }
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
    console.log(record)
    const config = new MatDialogConfig();
    config.width = '450px';
    config.data = record;
    const dialog = this.mdDialog.open(GenericFormComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.Save(d);
      }
    })
  }

  editLayout(UI: UI) {
    const config = new MatDialogConfig();
    config.width = '80%';
    config.height = '90%';
    config.data = UI;
    const dialog = this.mdDialog.open(UIEditorComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.Save(d);
      }
    })
  }
}

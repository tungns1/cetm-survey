import {
  Component, EventEmitter, Optional,
  Inject, forwardRef, ExistingProvider, OnInit, AfterViewInit
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IResourceForm } from '../shared';
import { UI } from '../../../shared'
import { cloneDeep } from 'lodash';
import { GenericFormComponent } from '../frame-form/generic-form/generic-form.component'

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
    private mdDialog: MatDialog
  ) {
    this.layout = cloneDeep(this.dialogData);
  }

  layout: UI;
  layoutGroup = []
  records

  ngOnInit() {
    // console.log(this.layout)
    // this.standardizedData();
    // this.layout.layout.children.forEach((child, i) => {
    //   if (child.children)
    //     this.getlayoutEl(child, i);
    //   else
    //     this.layoutGroup.push([{ [child.name]: this.layout.resources[child.name] }])
    // });
    // console.log(this.layoutGroup)
  }

  // ngAfterViewInit() {
  //   if (this.layout.layout) {
  //     let abc = document.getElementById(this.layout.layout.name);
  //     abc.style.backgroundColor = this.layout.layout.style.backgroundColor
  //   }

  // }

  save() {
    if (this.layout.style.backgroundImage) {
      this.layout.style.backgroundSize = 'cover'
      this.layout.style.backgroundRepeat = 'no-repeat'
    }

    this.dialog.close(this.layout);
  }

  // getlayoutEl(container: any, mainContainerIndex: number) {
  //   if (container.children) {
  //     container.children.forEach(child => {
  //       this.getlayoutEl(child, mainContainerIndex)
  //     });
  //   }
  //   else {
  //     if (!this.layoutGroup[mainContainerIndex])
  //       this.layoutGroup[mainContainerIndex] = [];
  //     this.layoutGroup[mainContainerIndex].push({ [container.name]: this.layout.resources[container.name] })
  //   }
  // }

  // standardizedData() {
  //   if (!this.layout.layout.style)
  //     this.layout.layout.style = {};
  //   if (this.layout.layout.background_url) {
  //     this.layout.layout.style.backgroundImage = 'url(' + this.layout.layout.background_url + ')';
  //     this.layout.layout.style.backgroundPosition = 'center center'
  //     this.layout.layout.style.backgroundSize = 'cover'
  //     delete this.layout.layout.background_url;
  //   }
  // }

  // editResource(rsc: any) {
  //   // console.log(rsc)
  //   const key = Object.keys(rsc)[0]
  //   const config = new MatDialogConfig();
  //   config.width = '450px';
  //   config.data = rsc[key];
  //   const dialog = this.mdDialog.open(GenericFormComponent, config);
  //   dialog.afterClosed().subscribe(d => {
  //     if (d) {
  //       this.layout.resources[key] = d;
  //     }
  //   })
  // }

  // test() {
  //   console.log(this.layout)
  // }
  cancel() {
    this.dialog.close(null)
  }

}

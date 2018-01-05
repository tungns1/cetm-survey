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
import { LayoutEditorComponent } from '../layout-editor/layout-editor.component'

const GENERIC_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UIEditorComponent),
  multi: true
}

@Component({
  selector: 'app-ui-editor',
  templateUrl: './ui-editor.component.html',
  styleUrls: ['./ui-editor.component.scss']
})
export class UIEditorComponent {
  /**
     * Safely clone the obj
     * @param obj the given object
     */
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialog: MatDialogRef<UIEditorComponent>,
    private mdDialog: MatDialog
  ) {
    this.UI = cloneDeep(this.dialogData);
  }

  UI: UI;
  layoutGroup = []
  isResources: boolean = true;
  lastBackgroundColor: string;

  ngOnInit() {
    this.standardizedData();
    this.UI.layout.children.forEach((child, i) => {
      if (child.children)
        this.getlayoutEl(child, i);
      else
        this.layoutGroup.push([{ [child.name]: this.UI.resources[child.name] }])
    });
    
    // hide holder in view
    for (var i = this.layoutGroup.length - 1; i >= 0; i--) {
      for (let j = this.layoutGroup[i].length - 1; j >= 0; j--) {
        if (Object.keys(this.layoutGroup[i][j]).indexOf('holder') > -1) {
          this.layoutGroup[i].splice(j, 1);
        }
      }
    }
  }

  ngAfterViewInit() {
    this.applyUI();
  }

  standardizedData() {
    if (!this.UI.layout.style)
      this.UI.layout.style = {};
    if (this.UI.layout.background_url) {
      this.UI.layout.style.backgroundImage = 'url(' + this.UI.layout.background_url + ')';
      this.UI.layout.style.backgroundPosition = 'center center'
      this.UI.layout.style.backgroundSize = 'cover'
      delete this.UI.layout.background_url;
    }
    this.UI.layout.children.forEach(layout => {
      if (!layout.style)
        layout.style = {};
    });
  }

  toggle() {
    this.isResources = !this.isResources;
    this.applyUI();
  }

  mouseEnterLayout(e) {
    this.lastBackgroundColor = e.target.style.backgroundColor;
    e.target.style.backgroundColor = '#9c9c9c';
  }

  mouseLeaveLayout(e) {
    e.target.style.backgroundColor = this.lastBackgroundColor;
  }

  getFlex(index) {
    return this.UI.layout.children[index].flex;
  }

  getlayoutEl(container: any, mainContainerIndex: number) {
    if (container.children) {
      container.children.forEach(child => {
        this.getlayoutEl(child, mainContainerIndex)
      });
    }
    else {
      if (!this.layoutGroup[mainContainerIndex])
        this.layoutGroup[mainContainerIndex] = [];
      this.layoutGroup[mainContainerIndex].push({ [container.name]: this.UI.resources[container.name] })
    }
  }

  editResource(rsc: any) {
    const key = Object.keys(rsc)[0]
    const config = new MatDialogConfig();
    config.width = '450px';
    config.data = rsc[key];
    const dialog = this.mdDialog.open(GenericFormComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.UI.resources[key] = d;
      }
    })
  }

  editLayout(layout: any, index: number, event) {
    event.stopPropagation();
    const config = new MatDialogConfig();
    config.width = '750px';
    index >= 0 ? config.data = layout.children[index] : config.data = layout;
    const dialog = this.mdDialog.open(LayoutEditorComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        index >= 0 ? this.UI.layout.children[index] = d : this.UI.layout = d;
        this.applyUI();
      }
    })
  }

  applyUI() {
    if (this.UI.layout) {
      setTimeout(_ => {
        let UIBackground = document.getElementById('ui-editor-' + this.UI.layout.name);
        if (UIBackground) {
          UIBackground.style.backgroundColor = this.UI.layout.style.backgroundColor;
          UIBackground.style.backgroundImage = this.UI.layout.style.backgroundImage;
          // UIBackground.style.backgroundImage = `url('http://localhost:3000/upload/backGround.png')`;
          UIBackground.style.backgroundPosition = this.UI.layout.style.backgroundPosition;
          UIBackground.style.backgroundSize = 'cover';
          UIBackground.style.backgroundRepeat = 'no-repeat';

          UIBackground.style.color = this.UI.layout.style.color;
        }
        this.UI.layout.children.forEach(element => {
          let UIElement = document.getElementById('ui-editor-' + element.name);
          if (UIElement) {
            UIElement.style.backgroundColor = element.style.backgroundColor;
            UIElement.style.backgroundImage = element.style.backgroundImage;
            UIElement.style.backgroundPosition = element.style.backgroundPosition;

            UIElement.style.color = element.style.color;
          }
        });
      })
    }
  }

  save() {
    this.dialog.close(this.UI);
  }

  cancel() {
    this.dialog.close(null)
  }
}

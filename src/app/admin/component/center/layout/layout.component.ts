import { Component, Injector, AfterViewChecked } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {
  BaseAdminComponent, CommonValidator,
  CenterService, ILayout, AllRoles, UI
} from '../../shared';
import { cloneDeep } from 'lodash';
import { UIEditorComponent } from '../../shared/resource/ui-editor/ui-editor.component'

@Component({
  selector: 'center-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent extends BaseAdminComponent<ILayout> {
  constructor(
    injector: Injector,
    private org: CenterService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super(injector, org.LayoutService);
  }

  private branches = this.org.LayoutService.RxListView;

  private layoutImportBtn;
  private fileName: string = '';
  private ui: UI;
  private tag$ = this.activateRoute.params.map(q => q.tag);
  protected layouts$ = this.org.LayoutService.RxListView.switchMap(layouts => {
    return this.tag$.map(tag => {
      return layouts.filter(layout => {
        return layout.type == tag;
      })
    })
  })


  ngAfterViewInit() {
    this.layoutImportBtn = document.getElementById('layoutImportBtn');
    if (this.layoutImportBtn)
      this.layoutImportBtn.addEventListener('change', (_ => {
        if (this.layoutImportBtn.files[0])
          this.fileName = this.layoutImportBtn.files[0].name
      }));

    this.form$.subscribe(form => {
      if (form)
        this.ui = form.value.ui;
    });
  }

  makeForm(b?: ILayout) {
    b = b || <any>{};
    b.ui = b.ui || <any>{};
    b.ui.resources = b.ui.resources || {};
    const resources = Object.assign(cloneDeep(b.ui.resources), b.resources);
    Object.keys(resources).forEach(name => {
      const show = !!resources[name];
      resources[name].show = show;
    });

    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, CommonValidator.Name],
      type: [b.type, Validators.required],
      ui: [b.ui || {}],
      style: [b.style],
      resources: [resources]
    });
  }

  readUIDataFormFile(event) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = _ => {
      this.form$.first().subscribe(form => {
        form.setValue({
          id: form.value.id,
          name: form.value.name,
          type: form.value.type,
          style: form.value.style,
          resources: form.value.resources,
          ui: JSON.parse(reader.result),
        })
      })
      const ref = this.matSnackBar
        .open(this.translateService.translate('The file was import successfully'),
        this.translateService.translate('Close'), {
          duration: 6000,
          extraClasses: ["success"]
        });
    };
    reader.onerror = (error) => {
      console.log(error)
    }
    if (input['files'][0])
      reader.readAsText(input['files'][0]);
  }

  editLayout() {
    const config = new MatDialogConfig();
    config.width = '50%';
    config.data = this.ui;
    const dialog = this.dialog.open(UIEditorComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.saveUI(d);
      }
    })
  }

  saveUI(ui: UI) {
    this.form$.first().subscribe(form => {
      let value = form.value;
      value.ui = ui;
      form.setValue(value);
    })
  }


}



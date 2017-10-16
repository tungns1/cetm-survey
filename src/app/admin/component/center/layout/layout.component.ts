import { Component, Injector, AfterViewChecked } from '@angular/core';
import { CenterService, ILayout, AllRoles } from '../../shared/';
import { FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { BaseAdminComponent, CommonValidator } from '../../shared';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'center-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent extends BaseAdminComponent<ILayout> {
  constructor(
    injector: Injector,
    private org: CenterService
  ) {
    super(injector, org.LayoutService);
  }

  private branches = this.org.LayoutService.RxListView;

  private layoutImportBtn;
  private fileName: string = '';

  ngAfterViewInit() {
    this.layoutImportBtn = document.getElementById('layoutImportBtn');
    if (this.layoutImportBtn)
      this.layoutImportBtn.addEventListener('change', (_ => {
        if (this.layoutImportBtn.files[0])
          this.fileName = this.layoutImportBtn.files[0].name
      }));

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

  getUIData(event) {
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

  editUI() {

  }


}



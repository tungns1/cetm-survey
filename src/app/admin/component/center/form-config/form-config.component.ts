import {
  Component, Injector, AfterViewChecked,
  Optional, Inject
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  BaseAdminComponent, CommonValidator,
  CenterService, ILayout, AllRoles, UI
} from '../../shared';
import { cloneDeep } from 'lodash';
import { UIEditorComponent } from '../../shared/resource/ui-editor/ui-editor.component';
import { FontEditorComponent } from '../../shared/resource/font-editor/font-editor.component';
import { GenericFormComponent } from '../../shared/resource/frame-form/generic-form/generic-form.component';
import { CustomFormService } from '../../../service/center/cform';
import { CacheService } from '../../../../shared/model/center/service';
import { IColForm, IForm } from '../../../../shared/model/center/cform';
import { Location } from '@angular/common';
declare var $:any
@Component({
  selector: 'app-form-config',
  templateUrl: './form-config.component.html',
  styleUrls: ['./form-config.component.scss'],
  providers: [CustomFormService]
})
export class FormConfigComponent { // Remember to change interface
  constructor(
    injector: Injector,
    private org: CenterService,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formservice: CustomFormService,
    private location: Location
  ) {
    // super(injector, org.LayoutService);
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
  protected listService$ = CacheService.RxListView.value
  protected listform$ = this.formservice.getDataForm()

  ngOnInit() {
    this.getCol();
  }
  ngAfterViewInit() {
    this.layoutImportBtn = document.getElementById('layoutImportBtn');
    if (this.layoutImportBtn)
      this.layoutImportBtn.addEventListener('change', (_ => {
        if (this.layoutImportBtn.files[0])
          this.fileName = this.layoutImportBtn.files[0].name
      }));

    // this.form$.subscribe(form => {
    //   if (form)
    //     this.ui = form.value.ui;
    // });
  }
  allCol: IColForm[] = []
  isList: boolean = true
  isNew: boolean = true
  formData: IForm = {
    id: '',
    mtime: 0,
    dtime: 0,
    name: '',
    service_id:'',
    form_html: '',
    item_forms: null 
  }
  private GoBack() {
    
    this.isList = true
  }
  makeForm(b?: IForm) {
    b = b || <any>{};
    return (new FormBuilder).group({
      id: [b.id],
      name: [b.name, CommonValidator.Name],
      service_id: [b.service_id],
      form_html: [b.form_html]

    });
  }
  onAction() {
    this.isList = false;
    this.isNew = true
  }
  addToView(id) {
    console.log('xxx')
    var html = '<li>cdsdsfdsfds</li>';
    // $('#view_form ul').append(html);
    let test = document.getElementById("view_form")
    test.innerText += html
      
  }
  addNew(){
    console.log(this.formData)
    this.formservice.createForm(this.formData).subscribe(val=>{
      this.isList = true;

    })
  }
  getCol() {
    this.formservice.getAllCol().subscribe(val => {
      console.log(val.data);
      this.allCol = val.data
    })
  }
  sent() {
    console.log('dgfdgfd99')
  }
  // readUIDataFormFile(event) {
  //   let input = event.target;
  //   let reader = new FileReader();
  //   reader.onload = _ => {
  //     this.form$.first().subscribe(form => {
  //       form.setValue({
  //         id: form.value.id,
  //         name: form.value.name,
  //         type: form.value.type,
  //         style: form.value.style,
  //         resources: form.value.resources,
  //         ui: JSON.parse(reader.result),
  //       })
  //     })
  //     const ref = this.matSnackBar
  //       .open(this.translateService.translate('The file was import successfully'),
  //       this.translateService.translate('Close'), {
  //         duration: 6000,
  //         extraClasses: ["success"]
  //       });
  //   };
  //   reader.onerror = (error) => {
  //     console.log(error)
  //   }
  //   if (input['files'][0])
  //     reader.readAsText(input['files'][0]);
  // }

  // editLayout() {
  //   const config = new MatDialogConfig();
  //   config.width = '50%';
  //   config.data = this.ui;
  //   const dialog = this.dialog.open(UIEditorComponent, config);
  //   dialog.afterClosed().subscribe(d => {
  //     if (d) {
  //       this.saveUI(d);
  //     }
  //   })
  // }

  // editTemplate() {
  //   const config = new MatDialogConfig();
  //   config.width = '450px';
  //   config.data = this.ui;
  //   const dialog = this.dialog.open(XListComponent, config);
  //   dialog.afterClosed().subscribe(d => {
  //     if (d) {
  //       this.saveUI(d);
  //     }
  //   })
  // }

  // saveUI(ui: UI) {
  //   this.form$.first().subscribe(form => {
  //     let value = form.value;
  //     value.ui = ui;
  //     form.setValue(value);
  //   })
  // }

  openFontList() {
    const config = new MatDialogConfig();
    config.width = '450px';
    config.data = this.ui;
    const dialog = this.dialog.open(FontEditorComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.ui = d;
      }
    })
  }


}


@Component({
  selector: 'app-template-list',
  template: `
  <div id="templateListModal">
    <h1 class="modal-header">Template List</h1>
    <div class="padding-20">

      <div *ngFor="let template of data.layout.templates; let index = index" fxLayout="row" class="margin-b-20">
        <span fxFlex class="padding-t-5">{{template.name}}</span>
        <div fxFlex="10"></div>
        <button fxFlex="40" class="btnFill" (click)="editTemp(template, index)">Edit</button>
      </div>
    
      <div fxLayout="row" fxLayoutGap="10px">
        <button fxFlex class="btnClear" (click)="Cancel()">Cancel</button>
        <button fxFlex class="btnFill" (click)="Save()">Ok</button>
      </div>
    </div>
  </div>
  `,
})
export class XListComponent {
  /**
   * Safely clone the obj
   * @param obj the given object
   */
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: UI,
    private dialog: MatDialogRef<UI>,
    private dialogEditTemp: MatDialog
  ) { }

  data: UI;

  ngOnInit() {
    this.data = this.dialogData;
  }

  Save() {
    this.dialog.close(this.data);
  }

  Cancel() {
    this.dialog.close(null)
  }

  editTemp(template: any, index: number) {
    const config = new MatDialogConfig();
    config.width = '550px';
    config.data = {
      name: template.name,
      data: template,
      type: 'template'
    };
    const dialog = this.dialogEditTemp.open(GenericFormComponent, config);
    dialog.afterClosed().subscribe(d => {
      if (d) {
        this.data.layout.templates[index] = d.data;
      }
    })
  }

}



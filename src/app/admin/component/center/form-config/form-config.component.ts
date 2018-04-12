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
declare var $: any
export interface formArr {
  col_name: string
  description: string
  type: string
}
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
  formArray: formArr[] = []
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
    service_id: '',
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
  addToView(fName, fDescription) {
    let item: formArr = { col_name: '', description: '', type: 'txt' }
    item.col_name = fName;
    item.description = fDescription
    this.formArray.push(item)
    $("#view_form").sortable({
      placeholder: "ui-state-highlight"
    });
    $("#view_form").disableSelection();
  }
  changeFormType(value, index) {
    this.formArray[index].type = value
  }
  addOption(index) {
    index = index + 1
    $('.form-row').removeClass('active')
    var $form = $('#view_form').find('.form-row:nth-child(' + index + ')').addClass('active')
    $("#addOption").modal("show");
    $("#addOption").on('hide.bs.modal', function () {
      $('.value-option').html('')
      $('#drop_value').val('')
    });
  }
  addMoreValue() {
    var value = $('#drop_value').val()
    $('.value-option').append('<li>' + value + '</li>')
    $('#btn_save_drop').off('click').on('click', function () {
      $('.value-option li').each(function () {
        $('.form-row.active').find('select.form-input').append(' <option value="' + $(this).text() + '">' + $(this).text() + '</option>')
      })
      $("#addOption").modal("hide");
    })
  }
  addNew() {
    //get html value
    this.formData.form_html = $('#view_form').html()
    console.log(this.formData)
    this.formservice.createForm(this.formData).subscribe(val => {
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



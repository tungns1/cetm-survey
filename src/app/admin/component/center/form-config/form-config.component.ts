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
import { map, switchMap } from 'rxjs/operators';
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
  private tag$ = this.activateRoute.params.pipe(map(q => q.tag));
  protected layouts$ = this.org.LayoutService.RxListView.pipe(switchMap(layouts => {
    return this.tag$.pipe(map(tag => {
      return layouts.filter(layout => {
        return layout.type == tag;
      })
    }))
  }))
  protected listService$ = CacheService.RxListView.value
  protected listform$ = this.formservice.getDataForm()
  formArray: formArr[] = []
  ngOnInit() {
    this.getCol();
    this.getAllForm();
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
    this.formArray = []
    this.isList = true
    this.formData = {
      id: '',
      mtime: 0,
      dtime: 0,
      name: '',
      service_id: '',
      form_html: '',
      item_forms: null
    }
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
  service_created: any[] = []
  onAction(e) {
    console.log(e);
    if (e.action == "edit") {
      this.isList = false;
      this.isNew = false
      this.formservice.getFormBySerId(e.value.service_id).subscribe(val => {
        this.formData = val.data
      })
    } else if (e.action == "remove-confirm") {
      this.formservice.deleteForm(e.value.id).subscribe(val => {
        this.getAllForm()


      })
    } else {
      this.isNew = true
      this.isList = false;
    }

    this.formservice.getSerForm().subscribe(val => {
      // this.service_created = val
      this.listService$ = val.data
      // this.listService$ =this.listService$.filter(service => !this.service_created.find(ser_id=> ser_id === service.id))
    })
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
  onChangeDes(value, index) {
    this.formArray[index].description = value
    console.log(value)
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

      this.formData = {
        id: '',
        mtime: 0,
        dtime: 0,
        name: '',
        service_id: '',
        form_html: '',
        item_forms: null
      }
      this.formArray = []
      this.getAllForm()
    })

  }
  getAllForm() {
    this.formservice.getAllForm().subscribe(val => {
      this.listform$ = val.data
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
  deleteForm(i) {

    $('.form-row.active').splice(i, 1)
  }

}
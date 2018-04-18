import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../../shared/model/center/service';
import { CustomFormService } from '../../../service/center/cform';
import { IForm, IDForm } from '../../../../shared/model/center/cform';
import { Router } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  providers: [CustomFormService]

})

export class FormUserComponent implements OnInit {

  constructor(
    private formservice: CustomFormService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.listService$)
  }
  isList: boolean = true;
  formView: IForm
  formName: string
  formData: IDForm = {
    form_id:"",
    data: null
  }
  formObj: any

  protected listService$ = CacheService.RxListView.value
  onAction(e) {

    if (e.action = "edit") {
      this.formData.form_id = e.value.id
      this.isList = false;
      this.formservice.getFormBySerId(e.value.id).subscribe(val => {
        this.formView = val.data.form_html
        this.formName = val.data.name
        $('#view_form').html($.parseHTML(val.data.form_html));
      })
    }
  }
  private GoBack() {

    this.isList = true
  }
  Save() {
    var a = []
    let b = []
    var data = {}
    $('.form-input').each(function () {
      var value = $(this).val()
      var name = $(this).attr('name')
      this.formObj = {}
      this.formObj[name] = value
      a.push(this.formObj)
      console.log(a)
      var result = {};
      for (var i = 0; i < a.length; i++) {
        result = Object.assign(result, a[i])
      }
      console.log(65465, result);
      data = result
      // this.formData.push(this.formObj)
    })
    b.push(data)
    this.formData.data = b

    console.log(this.formData, b)
    debugger
    this.formservice.FillForm(this.formData).subscribe(val => { 
      this.formData = {
        form_id:"",
        data: null
      }
    this.isList = true
      
    })

  }

}

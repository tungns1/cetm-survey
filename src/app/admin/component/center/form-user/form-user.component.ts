import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../../shared/model/center/service';
import { CustomFormService } from '../../../service/center/cform';
import { IForm } from '../../../../shared/model/center/cform';
import { Router } from '@angular/router';
declare var $:any
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
  protected listService$ = CacheService.RxListView.value
  onAction(e){
    
    if(e.action = "edit"){
     
      this.isList = false;
      this.formservice.getFormBySerId(e.value.id).subscribe(val=>{
        this.formView = val.data.form_html
        this.formName = val.data.name
        $('#view_form').html($.parseHTML(val.data.form_html));
      })
    }
  }
  private GoBack() {

    this.isList = true
  }
}

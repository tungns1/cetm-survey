import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { SetupAPI, IConfigTransaction } from "../transaction.service";

@Component({
  selector: 'time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {

  constructor(private setupApi: SetupAPI, private fb: FormBuilder) {
  }
  form: FormGroup;
  ;
  ngOnInit() {
    this.setupApi.GetByKey().subscribe(v => {
      if (v != null) {
        this.form = this.makeForm(v.value);
      }
    });
    this.form = this.makeForm();
  }
  makeForm(b?: IConfigTransaction) {
    b = b || <any>{};
    return this.fb.group({
      serving_time: [b.serving_time],
      attended: [b.attended],
    });
  }

  Submit() {
    this.setupApi.Update(this.form.value);
  }

}

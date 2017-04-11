import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { SetupAPI, IConfigTime } from "../service.service";

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
  makeForm(b?: IConfigTime) {
    b = b || <any>{};
    return this.fb.group({
      max_serving: [b.max_serving],
      max_waiting: [b.max_waiting],
      auto_finish: [b.auto_finish],
    });
  }

  Submit() {
    this.setupApi.Update(this.form.value);
  }

}

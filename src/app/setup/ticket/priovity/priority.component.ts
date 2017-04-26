import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { SetupAPI, IConfigPriority } from "../ticket.service";

@Component({
  selector: 'priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent {

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
  makeForm(b?: IConfigPriority) {
    b = b || <any>{};
    return this.fb.group({
      service_priority: [b.service_priority],
      customer_priority: [b.customer_priority],
      vip_card: [b.vip_card],
      customer_vip: [b.customer_vip],
      ticket_online: [b.ticket_online],
      min_priority_for_call: [b.min_priority_for_call],
    });
  }

  Submit() {
    this.setupApi.Update(this.form.value);
  }

}

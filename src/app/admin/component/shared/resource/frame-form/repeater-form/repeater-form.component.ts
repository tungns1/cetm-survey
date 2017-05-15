import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const REPEATER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RepeaterFormComponent),
  multi: true
}

interface IRepeaterForm {
  row: number;
  column: number;
  limit: number;
  template_name: string;
  repeat?: any[]
}

@Component({
  selector: 'app-repeater-form',
  templateUrl: './repeater-form.component.html',
  styleUrls: ['./repeater-form.component.scss'],
  providers: [REPEATER_CONTROL_VALUE_ACCESSOR]
})
export class RepeaterFormComponent extends BaseFormComponent<IRepeaterForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */
  
    keyRepeatArr: string[] = [];
  

  ngOnInit() {
      
  }

  writeValue(v: IRepeaterForm) {
    super.writeValue(v);
    if (this.value) {
      for (var key in this.value.repeat[0]) {
        if (this.value.repeat[0].hasOwnProperty(key)) {
          // console.log(key + " -> " + this.value.repeat[0][key]);
          this.keyRepeatArr.push(key);
        }
      }
    }
  }

  protected clone(obj: any): IRepeaterForm {
    // console.log(obj);
    return super.clone(obj);
  }

}

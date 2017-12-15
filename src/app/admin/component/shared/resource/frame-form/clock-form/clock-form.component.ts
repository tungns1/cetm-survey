import { Component, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const TEXT_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ClockFormComponent),
  multi: true
}

interface IClockForm {
  style: any;
}

@Component({
  selector: 'app-clock-form',
  templateUrl: './clock-form.component.html',
  styleUrls: ['./clock-form.component.scss'],
  providers: [TEXT_CONTROL_VALUE_ACCESSOR]
})
export class ClockFormComponent extends BaseFormComponent<IClockForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  protected clone(obj: any): IClockForm {
    if (obj) {
      if (!obj.style) {
        obj.style = {}
      }
      if (obj.style.color === 'transparent') {
        obj.style.color = '#00000000';
      }
    }
    return super.clone(obj);
  }

  changeColor() {
    this.onChangeCallback(this.value)
  }

}

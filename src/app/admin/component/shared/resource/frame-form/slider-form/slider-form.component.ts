import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const SLIDER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderFormComponent),
  multi: true
}

interface SliderForm {
  srcs: string[];
  timing: number;
  animation: string;
}

@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.scss'],
  providers: [SLIDER_CONTROL_VALUE_ACCESSOR]
})
export class SliderFormComponent extends BaseFormComponent<SliderForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  protected clone(obj: any): SliderForm {
    if (typeof obj === 'string') {
      return {
        srcs: [obj],
        timing: 3,
        animation: 'hinge'
      }
    }
    return super.clone(obj);
  }

}
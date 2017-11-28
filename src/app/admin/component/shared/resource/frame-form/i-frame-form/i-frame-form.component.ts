import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';
import { Event } from '@angular/router/src/events';

const SLIDER_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IFrameFormComponent),
  multi: true
}

interface IFrameForm {
  data: {
    src: string;
  }
}

@Component({
  selector: 'app-i-frame-form',
  templateUrl: './i-frame-form.component.html',
  styleUrls: ['./i-frame-form.component.scss'],
  providers: [SLIDER_CONTROL_VALUE_ACCESSOR]
})
export class IFrameFormComponent extends BaseFormComponent<IFrameForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  protected clone(obj: any): IFrameForm {
    return super.clone(obj);
  }

}
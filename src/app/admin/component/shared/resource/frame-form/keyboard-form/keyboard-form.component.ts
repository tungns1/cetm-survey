import { Component, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const KEYBOARD_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KeyboardFormComponent),
  multi: true
}

interface I18nForm {
  data: {
    type: 'compact' | 'full';
    shape: 'rectangle' | 'cycle';
    style: {
      border: {
        active: string;
        inActive?: string;
      };
      position?: string;
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
      width?: string;
    }
    lang: {
      img: string;
      code: string;
    }[];
  }
}

@Component({
  selector: 'app-keyboard-form',
  templateUrl: './keyboard-form.component.html',
  styleUrls: ['./keyboard-form.component.scss'],
  providers: [KEYBOARD_CONTROL_VALUE_ACCESSOR]
})
export class KeyboardFormComponent extends BaseFormComponent<I18nForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  borderWidth: string = '';
  borderActiveColor: string = '';
  borderInactiveColor: string = '';

  protected clone(obj: any): I18nForm {
    if (obj) {
      
      console.log(obj)
    }
    return super.clone(obj);
  }

  protected onChange(event: Event) {
    super.onChange(event);
  }

  changeBackgroundColor(color: string) {
    this.onChangeCallback(this.value)
  }
}
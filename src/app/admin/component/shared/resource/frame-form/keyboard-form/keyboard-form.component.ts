import { Component, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const KEYBOARD_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => KeyboardFormComponent),
  multi: true
}

interface KeyboardForm {
  data: {
    backgroundColor: {    //backgroundColor of each btn
      color: string;
      active: string;
    }
    color: string;
    fontSize: string;
    style: {
      boxSizing: string;
    }
  }
}

@Component({
  selector: 'app-keyboard-form',
  templateUrl: './keyboard-form.component.html',
  styleUrls: ['./keyboard-form.component.scss'],
  providers: [KEYBOARD_CONTROL_VALUE_ACCESSOR]
})
export class KeyboardFormComponent extends BaseFormComponent<KeyboardForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  borderWidth: string = '';
  borderActiveColor: string = '';
  borderInactiveColor: string = '';

  protected clone(obj: any): KeyboardForm {
    if (obj && obj.style) {
      obj.style.boxSizing = 'border-box';
      console.log(obj);
      if (obj.style.backgroundColor === 'transparent') {
        obj.style.backgroundColor = '#00000000'
      }
      if (obj.data.backgroundColor.color === 'transparent') {
        obj.data.backgroundColor.color = '#00000000'
      }
      if (obj.data.backgroundColor.active === 'transparent') {
        obj.data.backgroundColor.active = '#00000000'
      }
      if (obj.data.color === 'transparent') {
        obj.data.backgroundColor.active = '#00000000'
      }
    }
    return super.clone(obj);
  }

  protected onChange(event: Event) {
    super.onChange(event);
  }

  changeValue() {
    this.onChangeCallback(this.value)
  }
}
import { Component, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const TEXT_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextFormComponent),
  multi: true
}

interface I18n {
  [index: string]: string;
}

interface ITextForm {
  data: {
    align: 'left' | 'center' | 'right';
    i18n: I18n;
  },
  style: any;
}

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss'],
  providers: [TEXT_CONTROL_VALUE_ACCESSOR]
})
export class TextFormComponent extends BaseFormComponent<ITextForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  protected clone(obj: any): ITextForm {
    if (obj) {
      if (typeof obj.data === 'string')
        obj.data = {
          align: "center",
          i18n: {
            en: obj.data
          }
        }

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

import { Component, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const I18N_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => I18nFormComponent),
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
  selector: 'app-i18n-form',
  templateUrl: './i18n-form.component.html',
  styleUrls: ['./i18n-form.component.scss'],
  providers: [I18N_CONTROL_VALUE_ACCESSOR]
})
export class I18nFormComponent extends BaseFormComponent<I18nForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  borderWidth: string = '';
  borderActiveColor: string = '';
  borderInactiveColor: string = '';

  protected clone(obj: any): I18nForm {
    if (obj) {
      if (!obj.style) {
        obj.style = {};
      }
      this.getBorderAttr(obj.data.style.border);
    }
    return super.clone(obj);
  }

  protected onChange(event: Event) {
    super.onChange(event);
  }

  changeValue() {
    this.onChangeCallback(this.value)
  }

  resetPos() {
    if (this.value.data.style.position === 'unset') {
      this.value.data.style.top = '';
      this.value.data.style.bottom = '';
      this.value.data.style.left = '';
      this.value.data.style.right = '';
    }
  }

  getBorderAttr(border: { active: string; inActive?: string }) {
    let active = border.active.split(' ');
    this.borderWidth = active[0];
    this.borderActiveColor = active[2] === 'transparent' ? '#00000000' : active[2];

    let inActive = border.inActive.split(' ');
    this.borderInactiveColor = inActive[2] === 'transparent' ? '#00000000' : inActive[2];
  }

  setBorderWidth() {
    let active = this.value.data.style.border.active.split(' ');
    active[0] = this.borderWidth;
    this.value.data.style.border.active = active.join(' ');

    let inactive = this.value.data.style.border.inActive.split(' ');
    inactive[0] = this.borderWidth;
    this.value.data.style.border.inActive = inactive.join(' ');
    this.onChangeCallback(this.value)
  }

  setActiveColor() {
    let active = this.value.data.style.border.active.split(' ');
    active[2] = this.borderActiveColor;
    this.value.data.style.border.active = active.join(' ');
    this.onChangeCallback(this.value)
  }

  setInactiveColor() {
    let inactive = this.value.data.style.border.inActive.split(' ');
    inactive[2] = this.borderInactiveColor;
    this.value.data.style.border.inActive = inactive.join(' ');
    this.onChangeCallback(this.value)
  }

  addLang() {
    let newLang = { code: '', img: '' }
    this.value.data.lang.push(newLang)
    this.onChangeCallback(this.value);
  }

  deleteLang(index: number) {
    this.value.data.lang.splice(index, 1);
    this.onChangeCallback(this.value);
  }

  // toggleDimMode(){
  //   thi
  // }
}
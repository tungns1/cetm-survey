import { Component, OnInit, forwardRef, ExistingProvider } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IResourceForm } from '../../shared';


import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

const TEXT_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextFormComponent),
  multi: true
}

interface I18n {
  [index: string]: string;
}

interface ITextForm {
  align: 'left' | 'center' | 'right';
  i18n: I18n;
  scroll?: 'rtl' | 'ltr';
}

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss'],
  providers: [TEXT_CONTROL_VALUE_ACCESSOR]
})
export class TextFormComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  ngOnInit() {
  }

  private value: ITextForm;

  private onChangeCallback = (data: ITextForm) => { }

  /**
     * Write a new value to the element.
     */
  writeValue(obj: any) {
    this.value = this.clone(obj);
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any) {

  }

  /**
   * Safely clone the obj
   * @param obj the given object
   */

  private clone(obj: any): ITextForm {
    if (typeof obj === 'string') {
      return {
        align: "center",
        i18n: {
          en: obj
        }
      }
    } else {
      obj = obj || {};
      const value = Object.assign({ align: "center" }, obj);
      value.i18n = Object.assign({}, obj.i18n);
      return value;
    }
  }

  onChange(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.onChangeCallback(this.value);
  }

}

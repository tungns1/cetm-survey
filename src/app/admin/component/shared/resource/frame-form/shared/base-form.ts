import { ControlValueAccessor } from '@angular/forms';
import { cloneDeep } from 'lodash';

export class BaseFormComponent<T> implements ControlValueAccessor {
  protected value: T;

  protected onChangeCallback = (data: T) => { };
  // protected keyRepeatArr: string[] = [];
  

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

  protected clone(obj: any): T {
    return cloneDeep(obj);
  }

  onChange(event: Event) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    console.log(this.value);
    this.onChangeCallback(this.value);
  }
}
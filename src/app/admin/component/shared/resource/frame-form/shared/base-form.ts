import { ControlValueAccessor } from '@angular/forms';
import { cloneDeep } from 'lodash';

export class BaseFormComponent<T> implements ControlValueAccessor {
  value: T;

  protected onChangeCallback = (data: T) => { };

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

  protected onChange(event: Event) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    this.onChangeCallback(this.value);
  }
}
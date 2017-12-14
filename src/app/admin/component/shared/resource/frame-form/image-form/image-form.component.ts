import { Component, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const IMAGE_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageFormComponent),
  multi: true
}

interface ImageForm {
  data: {
    srcs: string[],
    style: {}
  },
  style: any
}

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
  providers: [IMAGE_CONTROL_VALUE_ACCESSOR]
})
export class ImageFormComponent extends BaseFormComponent<ImageForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */


  protected clone(obj: any): ImageForm {
    if (obj) {
      if (typeof obj.data === 'string') {
        obj.data = {
          srcs: [obj.data],
          style: {}
        }
      }
      if(obj.style && obj.style.backgroundColor === 'transparent') {
        obj.style.backgroundColor = '#00000000'
      }
    }
    return super.clone(obj);
  }

  protected onChange(event: Event) {
    if (typeof this.value.data.srcs === 'string')
      this.value.data.srcs = [this.value.data.srcs];
    super.onChange(event);
  }

  changeBackgroundColor(color: string) {
    this.onChangeCallback(this.value)
  }
}

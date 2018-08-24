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
  selector: 'app-state-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
  providers: [IMAGE_CONTROL_VALUE_ACCESSOR]
})
export class ImageFormComponent extends BaseFormComponent<ImageForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  tempSrc: string;

  protected clone(obj: any): ImageForm {
    console.log(obj)
    if (obj) {
    this.tempSrc = obj.data.srcs[1]

      if (typeof obj.data === 'string') {
        obj.data = {
          srcs: [obj.data],
          style: {}
        }
      }
      if(obj.style && obj.style.backgroundColor === 'transparent') {
        obj.style.backgroundColor = '#00000000'
      }
      if(!obj.data.borderRadius){
        obj.data.borderRadius = ''
      }
      if(obj.data.border){
        if(obj.data.border === 'round'){
            obj.data.borderRadius = '100%'
        }else if(obj.data.border === 'square'){
            obj.data.borderRadius = ''
        }
        delete(obj.data.border)
      }
    }
    return super.clone(obj);
  }

  protected onChange(event: Event) {
    
    this.value.data.srcs = ['{user_avatar}',this.tempSrc];
    
    super.onChange(event);
  }

  changeBackgroundColor(color: string) {
    this.value.data.srcs = ['{user_avatar}',this.tempSrc.toString()];
    this.onChangeCallback(this.value)
  }
}

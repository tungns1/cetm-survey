import { Component, forwardRef, ExistingProvider } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormComponent } from '../shared';

const TEXT_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TemplateFormComponent),
  multi: true
}

interface ITemplateForm {
  data: {
    style: any;
  }
}


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  providers: [TEXT_CONTROL_VALUE_ACCESSOR]
})
export class TemplateFormComponent extends BaseFormComponent<ITemplateForm> {
  /**
   * Safely clone the obj
   * @param obj the given object
   */

  backgroundPosX: string = '';
  backgroundPosY: string = '';

  protected clone(obj: any): ITemplateForm {
    if (obj && obj.data) {
      if (!obj.data.style) {
        obj.data.style = {}
      }
      if (obj.data.style.color === 'transparent') {
        obj.data.style.color = '#00000000';
      }
      if (obj.data.style.backgroundColor === 'transparent') {
        obj.data.style.backgroundColor = '#00000000';
      }
      if (obj.data.style.backgroundImage && obj.data.style.backgroundPosition) {
        this.getBackgroundPosition(obj.data.style.backgroundPosition);
      }
    }
    return super.clone(obj);
  }

  changeStyle() {
    this.onChangeCallback(this.value);
  }

  getBackground(){
    if (this.value.data.style.backgroundImage) {
      this.value.data.style.backgroundSize = 'cover';
      this.value.data.style.backgroundRepeat = 'no-repeat';
      if (this.value.data.style.backgroundImage.indexOf('url(\'') === -1) {
        this.value.data.style.backgroundImage = 'url(\'' + this.value.data.style.backgroundImage + '\')'
      }
    }
    this.onChangeCallback(this.value);
  }

  getBackgroundPosition(pos: string) {
    this.backgroundPosX = pos.split(' ')[0];
    this.backgroundPosY = pos.split(' ')[1];
  }

  setBackgroundPos(){
    this.value.data.style.backgroundPosition = this.backgroundPosX + ' ' + this.backgroundPosY;
    this.onChangeCallback(this.value);
  }

}
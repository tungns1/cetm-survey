import { Component, OnInit, ElementRef, forwardRef } from '@angular/core';
import { Quill, QuillOptionsStatic } from 'quill';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as QuillConstructor from 'quill';

var quill: any = QuillConstructor;

import 'style-loader!quill/dist/quill.snow.css';

@Component({
  selector: 'app-quill-editor',
  template: `<div></div>`,
  styleUrls: ['./quill-editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuillEditorComponent),
    multi: true
  }],
})
export class QuillEditorComponent implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  private toolbarOptions = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'], // toggled buttons

    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme

    // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }], // outdent/indent

    [{ 'direction': 'rtl' }, 'link', 'image'],

    ['clean'] // remove formatting button
  ];

  private editor: Quill;
  private content: string;
  private onChangeCallBack: Function = () => { };
  private onTouchCallback: Function = () => { };

  ngOnInit() {

  }

  ngOnDestroy() {
    this.editor = null;
  }

  ngAfterViewInit() {
    this.editor = new quill(this.el.nativeElement.firstChild, {
      modules: {
        toolbar: this.toolbarOptions
      },
      theme: 'snow'
    });
    this.updateEditor();
    // update model if text changes
    this.editor.on('text-change', (delta, oldDelta, source) => {
      const newContent = JSON.stringify(this.editor.getContents());
      if (newContent != this.content) {
        this.content = newContent;
        this.onChangeCallBack(this.content);
      }
      // console.log(delta);
      let quillArr = document.getElementsByTagName('app-quill-editor');
      for (let i = 0; i < quillArr.length; i++) {
        let imgArr = quillArr[i].getElementsByTagName('img');
        for (let j = 0; j < imgArr.length; j++) {
          const i = imgArr[j];
          i.onload = (d) => {
            console.log(imgArr[j].width);
            imgArr[j].style.width = (imgArr[j].width * 0.35).toString() + 'px';
          }
        }
      }
    });
    this.editor.on('selection-change', (range) => {
      if (!range) {
        this.onTouchCallback();
      }
    });
  }

  writeValue(currentValue: any) {
    try {
      this.content = currentValue || '{}';
    } catch (e) {
      this.content = '{}';
    }
    this.updateEditor();
  }

  registerOnChange(fn: (value: string) => any): void {
    this.onChangeCallBack = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouchCallback = fn;
  }

  private updateEditor() {
    if (this.editor) {
      try {
        const data = JSON.parse(this.content);
        this.editor.setContents(data);
      } catch (e) {
        console.log(e);
      }
    }
  }

}

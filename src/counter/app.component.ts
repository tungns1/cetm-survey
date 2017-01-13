import { Component, OnInit, ApplicationRef, HostBinding, Input } from '@angular/core';
import { I18n } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private translate: I18n.TranslateService) { }

  ngOnInit() {
    I18n.AddLanguages(this.translate);
  }

} 
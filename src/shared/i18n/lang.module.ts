import { Component, OnInit, NgModule } from '@angular/core';
import { TranslateService, TranslateModule } from '../../x/i18n';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'change-language',
  template: `
    <div>
      <label>
        {{ 'HOME.SELECT' | translate }}
        <select #langSelect (change)="translate.use(langSelect.value)">
          <option *ngFor="let lang of translate.getLangs()" [value]="lang" [selected]="lang === translate.currentLang">{{ lang }}</option>
        </select>
      </label>
    </div>
    `
})
class ChangeLanguageComponent {
  constructor(private translate: TranslateService) { }

  ngOnInit() {

  }

}

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  declarations: [ChangeLanguageComponent],
  exports: [ChangeLanguageComponent, TranslateModule]
})
export class LanguageModule {

}
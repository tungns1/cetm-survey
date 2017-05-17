import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageNamePipe, CultureNamePipe } from './language.pipe';

@NgModule({
    declarations: [LanguageNamePipe, CultureNamePipe],
    exports: [LanguageNamePipe, CultureNamePipe]
})
export class I18nPipeModule { }
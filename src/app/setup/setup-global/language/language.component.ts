import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { SetupAPI, IConfigLanguage } from "../setup-global.service";
export interface ILanguage {
  code: string;
  name: string;
}

@Component({
  selector: 'language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {

  constructor(private setupApi: SetupAPI,private fb:FormBuilder) {
    this.languages = Languages;
  }
  form: FormGroup;
  languages: ILanguage[];
  ngOnInit() {
    this.setupApi.GetByKey().subscribe(v=>{
      if(v!=null){
      this.form= this.makeForm(v.value);
      }
    });
    this.form= this.makeForm();
  }
  makeForm(b?: IConfigLanguage) {
    b = b || <any>{};
    return this.fb.group({
      default: [b.default],
      support: [b.support],
    });
  }

  Submit() {
    this.setupApi.Update(this.form.value);
  }

}
const Languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Espanol' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'jp', name: 'Japan' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'cn', name: 'China' },
  { code: 'th', name: 'Thailand' },
  { code: 'br', name: 'Brazil' },
  { code: 'au', name: 'Australia' }]

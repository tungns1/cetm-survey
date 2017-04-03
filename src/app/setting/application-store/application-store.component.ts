import { Component, OnInit } from '@angular/core';
import { AppStorage } from '../../../store';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-application-store',
  templateUrl: './application-store.component.html',
  styleUrls: ['./application-store.component.scss']
})
export class ApplicationStoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.storeForm.valueChanges.subscribe(data => {
      AppStorage.Locale = data.locale;
    });
  }

  storeForm = new FormGroup({
    locale: new FormControl(AppStorage.Data.locale)
  });

}

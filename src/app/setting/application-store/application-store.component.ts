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
  }

  storeForm = new FormGroup({
    locale: new FormControl(AppStorage.value.locale)
  });

  save() {
    AppStorage.Data$.next(this.storeForm.value);
    setTimeout(_ => {
      window.location.reload();
    }, 250);
  }

}

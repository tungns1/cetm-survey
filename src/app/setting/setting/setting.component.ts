import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gender = "m";

  wolves = 1;

  back() {
    if (window.history.length < 1) {
      // 
    }
    window.history.back();
  }

}

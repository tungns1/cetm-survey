import { Component, OnInit, Input } from '@angular/core';
import { StoreAPI } from '../service/store.service';


@Component({
  selector: 'hour-tab',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.scss']
})
export class HourComponent {
  constructor(
    private counterAPI: StoreAPI
  ) { }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sum-info',
  templateUrl: './sum-info.component.html',
  styleUrls: ['./sum-info.component.scss']
})
export class SumInfoComponent implements OnInit {

  constructor() { }

  @Input() data;

  ngOnInit() {
   }

}

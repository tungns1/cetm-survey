import { Component, OnInit, Input } from '@angular/core';
import {
  IActivity
} from '../shared';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() name : string;
  @Input() data: IActivity[];

}

import { Component, OnInit } from '@angular/core';
// import {I } from '../../shared/model'
import { CounterListService } from '../service/counter-list.service'

@Component({
  selector: 'app-counters-map',
  templateUrl: './counters-map.component.html',
  styleUrls: ['./counters-map.component.scss']
})
export class CountersMapComponent implements OnInit {

  constructor(
    private counterListService: CounterListService
  ) { }

  countersMap: any[][];
  columnConfig: number = 10;

  ngOnInit() {
    this.counterListService.counterList$.subscribe(counterList => {
      console.log(counterList)
      counterList.forEach((counter, i) => {
        // if(i % 10)
        this.countersMap[i / this.columnConfig][i % this.columnConfig] = counter;
      });
    })
  }

}

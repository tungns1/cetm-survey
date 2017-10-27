import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  columnConfig: number = 10;
  countersMap$ = this.counterListService.counterList$.map(counterList => {
    // counterList.s
    let countersMap = [];
    while (counterList.length) countersMap.push(counterList.splice(0, this.columnConfig));
    while (countersMap[countersMap.length - 1].length < countersMap[0].length) {
      countersMap[countersMap.length - 1].push([]);
    }
    // console.log(countersMap)
    return countersMap;
  })

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

}

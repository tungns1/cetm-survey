import { Component, OnInit } from '@angular/core';
// import {I } from '../../shared/model'
import { Observable } from 'rxjs/Observable';
import { CounterListService } from '../service/counter-list.service';
import { SuperCounterService } from '../service/super-counter.service';
import { counterDetail } from '../../shared/model';

@Component({
  selector: 'app-counters-map',
  templateUrl: './counters-map.component.html',
  styleUrls: ['./counters-map.component.scss']
})
export class CountersMapComponent implements OnInit {

  constructor(
    private counterListService: CounterListService,
    private superCounterService: SuperCounterService,
  ) { }

  columnConfig: number = 10;
  countersMap$ = this.counterListService.counterList$.map(counterList => {
    this.selectCounter(counterList[0]);
    let countersMap = [];
    while (counterList.length) countersMap.push(counterList.splice(0, this.columnConfig));
    while (countersMap[countersMap.length - 1].length < countersMap[0].length) {
      countersMap[countersMap.length - 1].push([]);
    }
    // console.log(countersMap)
    return countersMap;
  })

  ngOnInit() {
    // this.selectCounter()
  }

  selectCounter(counter) {
    this.superCounterService.SelectedCounter$.next(counter);
    // let cells = document.getElementsByClassName('counterCell');
    // cells.forEach(element => {
      
    // });
    // let cell = document.getElementById(counter.counterName);
    // cell.classList.add('active')
  }

}

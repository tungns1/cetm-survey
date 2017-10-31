import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CounterListService, SuperCounterService } from '../shared/service';
import { counterDetail } from '../shared/model';

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

  columnConfig: number = 8;
  selectedCounter: counterDetail;
  serveLongConfig: number = 99856345665;
  countersMap$ = this.counterListService.counterList$.map(counterList => {
    counterList.sort((a, b) => {
      if (Number(a.counterNum) || Number(b.counterNum))
        return Number(a.counterNum) > Number(b.counterNum) ? 1 : -1;
    })
    // has error
    // .map(c => {
    //   if (c)
    //     c['serveLong'] = c.serveTime > this.serveLongConfig;
    //   return c;
    // })
    let countersMap = [];
    while (counterList.length) countersMap.push(counterList.splice(0, this.columnConfig));
    while (countersMap[countersMap.length - 1].length < countersMap[0].length) {
      countersMap[countersMap.length - 1].push([]);
    }
    if (this.selectedCounter) this.selectCounter(this.selectedCounter);
    return countersMap;
  })

  ngOnInit() {
    this.countersMap$.first().subscribe(c => {
      this.selectCounter(c[0][0]);
    })
  }

  selectCounter(counter: counterDetail) {
    this.selectedCounter = counter
    this.superCounterService.SelectedCounter$.next(counter);
    setTimeout(_ => {
      this.setActiveClass(counter);
    })
  }

  setActiveClass(counter) {
    let cells = document.getElementsByClassName('counterCell');
    if (cells)
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('activated');
      }
    let cell = document.getElementById(counter.counterName);
    if (cell)
      cell.classList.add('activated')
  }

}

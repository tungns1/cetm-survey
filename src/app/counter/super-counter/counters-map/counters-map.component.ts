import { Component, OnInit } from '@angular/core';
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

  columnConfig: number = 8;
  countersMap$ = this.counterListService.counterList$.map(counterList => {
    if (counterList[0])
      this.selectCounter(counterList[0])
    let countersMap = [];
    while (counterList.length) countersMap.push(counterList.splice(0, this.columnConfig));
    while (countersMap[countersMap.length - 1].length < countersMap[0].length) {
      countersMap[countersMap.length - 1].push([]);
    }
    return countersMap;
  })

  ngOnInit() {
  }

  selectCounter(counter) {
    this.superCounterService.SelectedCounter$.next(counter);
    setTimeout(_ => {
      this.setActiveClass(counter);
    })
  }

  setActiveClass(counter) {
    let cells = document.getElementsByClassName('counterCell');
    if (cells)
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove('active');
      }
    let cell = document.getElementById(counter.counterName);
    if (cell)
      cell.classList.add('active')
  }

}

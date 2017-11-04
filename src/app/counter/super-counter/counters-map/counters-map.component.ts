import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs/observable/interval';
import { CounterListService, SuperCounterService } from '../shared/service';
import { counterDetail } from '../shared/model';
// import { ProjectConfig } from '../../shared'

@Component({
  selector: 'app-counters-map',
  templateUrl: './counters-map.component.html',
  styleUrls: ['./counters-map.component.scss']
})
export class CountersMapComponent implements OnInit {

  constructor(
    private superCounterService: SuperCounterService,
  ) { }

  // columnConfig: number = 8;
  columnConfig: number = 3;
  selected: counterDetail;
  // serveLongConfig: number = 99856345665;
  // private oneSecond = interval(1000).share();
  // maxServingMinute = ProjectConfig.service.max_serving_minute;

  countersMap$ = this.superCounterService.Workspace$.map(w => {
    const counterList = w.counterList.ToArray();
    // Calculate column n row
    while (this.columnConfig < counterList.length && Math.ceil(counterList.length / parseFloat(this.columnConfig.toString())) >= this.columnConfig - 1) {
      this.columnConfig++;
    }
    let countersMap: counterDetail[][] = [];
    while (counterList.length) countersMap.push(counterList.splice(0, this.columnConfig));
    while (countersMap[countersMap.length - 1].length < countersMap[0].length) {
      countersMap[countersMap.length - 1].push(null);
    }
    if (this.selected) this.selectCounter(this.selected);
    return countersMap;
  })

  ngOnInit() {
    this.countersMap$.first().subscribe(c => {
      this.selectCounter(c[0][0]);
    })
  }

  selectCounter(counter: counterDetail) {
    this.selected = counter;
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
      cell.firstElementChild.classList.add('activated')
  }
}

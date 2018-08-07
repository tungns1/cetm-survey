import { Component, OnInit } from '@angular/core';
import { Observable ,  Subscription ,  interval } from 'rxjs';
import { CounterListService, SuperCounterService } from '../shared/service';
import { counterDetail } from '../shared/model';
import { map, first } from 'rxjs/operators';
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

  columnConfig: number = 3;
  selected: counterDetail;

  countersMap$ = this.superCounterService.Workspace$.pipe(map(w => {
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
    return countersMap;
  }))

  ngOnInit() {
    this.countersMap$.pipe(first()).subscribe(c => {
      this.selectCounter(c[0][0]);
    })
  }

  selectCounter(counter: counterDetail) {
    this.selected = counter;
    this.superCounterService.SelectedCounter$.next(counter);
  }

}

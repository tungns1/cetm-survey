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
    private counterListService: CounterListService,
    private superCounterService: SuperCounterService,
  ) { }

  // columnConfig: number = 8;
  columnConfig: number = 3;
  selectedCounter: counterDetail;
  // serveLongConfig: number = 99856345665;
  // private oneSecond = interval(1000).share();
  // maxServingMinute = ProjectConfig.service.max_serving_minute;

  countersMap$ = this.counterListService.counterList$.map(counterList => {
    // Calculate column n row
    while (this.columnConfig < counterList.length && Math.ceil(counterList.length / parseFloat(this.columnConfig.toString())) >= this.columnConfig - 1) {
      this.columnConfig++;
    }
    // Sorting
    counterList.sort((a, b) => {
      if (Number(a.counterNum) || Number(b.counterNum))
        return Number(a.counterNum) > Number(b.counterNum) ? 1 : -1;
    })
      // .map(counter => {
      //   let subscription;
      //   if (counter.ticketNum) {

      //     // counter = this.getServingMinute(counter, subscription).counter;
      //     // subscription = this.getServingMinute(counter, subscription).subscription;
      //   } else {
      //     if (subscription) {
      //       subscription.unsubscribe();
      //       subscription = null;
      //     }
      //   }
      // })
    let countersMap = [];
    while (counterList.length) countersMap.push(counterList.splice(0, this.columnConfig));
    while (countersMap[countersMap.length - 1].length < countersMap[0].length) {
      countersMap[countersMap.length - 1].push([]);
    }
    if (this.selectedCounter) this.selectCounter(this.selectedCounter);
    // console.log(countersMap)
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
      cell.firstElementChild.classList.add('activated')
  }

  // getServingMinute(counter: counterDetail, subscription: Subscription) {
  //   subscription = this.oneSecond.subscribe(_ => counter['servingTime'] = this.updateServingTime(counter.serveTime))
  //   return {
  //     counter: counter,
  //     subscription: subscription
  //   }
  // }

  // updateServingTime(start){
  //   return ((Date.now() - Number(start) || 0) % 3600) / 60;
  // }

}

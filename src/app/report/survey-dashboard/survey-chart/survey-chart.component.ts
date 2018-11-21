import { Component, OnInit, Input, ContentChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IKeyValue {
  key: string;
  value: string;
}

@Component({
  selector: 'app-survey-chart',
  templateUrl: './survey-chart.component.html',
  styleUrls: ['./survey-chart.component.scss']
})
export class SurveyChartComponent implements OnInit {

  constructor() { }

  data$ = new BehaviorSubject(null);
  results = [];
  paddingColumn: number;

  @Input() set data(data) {
    this.data$.next(data)
  };
  @ContentChild('legendGroup') legendGroup: ElementRef;
  ngOnInit() {
    this.data$.subscribe(data => {
      if (data) {
        this.results = this.getResults(data, this.getLegends());
        console.log(this.results)
      };
    });
  }

  private getResults(data, legends: IKeyValue[]) {
    let results = [];
    legends.forEach(legend => {
      let item = {
        name: legend.value,
        value: data[legend.key] || 0
      }
      results.push(item);
    })
    return results;
  }

  private getLegends() {
    let legends: IKeyValue[] = [];
    let group = this.legendGroup.nativeElement.getElementsByClassName('legendItem');
    for (let i = 0; i < group.length; i++) {
      let legend: IKeyValue = {
        key: group[i].attributes.for.value,
        value: group[i].innerText
      }
      legends.push(legend)
    }
    return legends;
  }

}

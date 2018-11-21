import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { GridOptions } from 'ag-grid';
import { IDetailSurvey } from '../../../shared';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.scss']
})
export class SurveyDetailComponent implements OnInit {

  constructor(
    private datePipe: DatePipe
  ) { }

  @Input() data: IDetailSurvey;
  @Input() index: number;
  answerData: { name: string, value: number, percent: string }[] = [];


  private gridOptions: GridOptions = { rowHeight: 35 };
  cellclass: string[] = ['padding-10', 'center'];

  ngOnInit() {
    // console.log(this.data)
    if (this.data.type === 'single' || this.data.type === 'multiple') {
      Object.keys(this.data.results).forEach(key => {
        this.answerData.push({ 
          name: key, 
          value: this.data.results[key], 
          percent: (this.data.results[key] * 100 / this.data.count).toFixed(2).toString() + '%'
        })
      })
    }
    else if (this.data.type === 'answer') {
      this.data.answers.map(answer => {
        answer.dateTime = this.datePipe.transform(answer.ctime) + ' - ' + this.datePipe.transform(answer.ctime, 'shortTime');
      })
    }
  }

}

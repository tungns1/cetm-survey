import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupByTitlePipe } from './groupBy.pipe';
import { GroupByTitleComponent } from './group-by-title.component';
import { D3Module } from '../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, FormsModule, D3Module
  ],
  declarations: [
    GroupByTitleComponent, GroupByTitlePipe
  ],
  exports: [
    D3Module,
    GroupByTitleComponent, GroupByTitlePipe
  ]
})
export class DashboardSharedModule { }

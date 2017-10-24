import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../shared';

@Component({
  selector: 'app-normal-workspace',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.scss']
})
export class NormalWorkspaceComponent implements OnInit {

  constructor(
    private workspaceService: WorkspaceService
  ) { }

  hasMiss = false;
  counterName$ = this.workspaceService.currentCounter$.map(c => c.name);

  ngOnInit() {
  }

}

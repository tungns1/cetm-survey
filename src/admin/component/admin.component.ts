import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Branch } from '../shared';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent {
  hidden = true;

  Refresh() {
    
  }
}

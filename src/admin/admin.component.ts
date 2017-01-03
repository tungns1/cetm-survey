import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent {
  hidden = true;
}

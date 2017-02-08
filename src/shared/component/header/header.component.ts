import { Component } from '@angular/core';
import { AuxState } from '../../../config/';

@Component({
    selector: "app-header",
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {
    title = AuxState('title');
}
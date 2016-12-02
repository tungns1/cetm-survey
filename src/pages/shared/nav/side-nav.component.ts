import { Component, Input } from '@angular/core';
import { Item } from './declare';

@Component({
    selector: 'side-nav',
    templateUrl: 'side-nav.component.html',
    styleUrls: ['side-nav.component.scss']
})
export class SideNavComponent {
    @Input() menu: Item[] = [];
}

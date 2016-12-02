import { Component, Input } from '@angular/core';
import { Item } from './declare';

@Component({
    selector: 'top-nav',
    templateUrl: 'top-nav.component.html',
    styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent {
    @Input() menu: Item[] = [];
}

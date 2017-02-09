import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { SetRefresh, RefreshAggregate } from '../../service/';
import { IFilter } from '../filter/';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
    selector: 'general',
    templateUrl: 'general.component.html'
})
export class GeneralComponent {
    tag = 'general';
    ngOnInit() {
        SetRefresh(RefreshAggregate);
    }

    setActive(tab) {
        this.tag = tab.tag;
    }

}
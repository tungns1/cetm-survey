import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InsideBranchFilterService } from '../shared';

@Component({
    selector: 'inside-filter',
    templateUrl: 'inside.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsideFilterComponent implements OnInit {
    @Input() onlyService:string = 'no';
    constructor(
        private insideFilterService: InsideBranchFilterService
    ) { }

    form = (new FormBuilder).group({
        user_id: [[]],
        counter_id: [[]],
        service_id: [[]]
    });

    ngOnInit() {
        setTimeout(() => {
            this.insideFilterService.Data$.subscribe(d => {
                this.form.setValue({
                    user_id: d.user_id,
                    counter_id: d.counter_id,
                    service_id: d.service_id
                }, { emitEvent: false });
            });
            this.form.valueChanges.subscribe(v => {
                this.insideFilterService.Update(
                    v.user_id,
                    v.service_id,
                    v.counter_id
                )
            })
        });
    }

    users$ = this.insideFilterService.users$.asObservable();
    counters$ = this.insideFilterService.counters$.asObservable();
    services$ = this.insideFilterService.services$.asObservable();
}
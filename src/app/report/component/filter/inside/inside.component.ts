import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InsideBranchFilterService } from '../../shared';

@Component({
    selector: 'inside-filter',
    templateUrl: 'inside.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsideFilterComponent implements OnInit {

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
            const value = this.insideFilterService.data;
            this.form.setValue({
                user_id: value.user_id,
                counter_id: value.counter_id,
                service_id: value.service_id
            });
            this.form.valueChanges.subscribe(v => {
                console.log(v);
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
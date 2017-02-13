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
            const value = this.insideFilterService.Filter.valueOf();
            this.form.setValue(value);
            this.form.valueChanges.subscribe(v => {
                this.insideFilterService.SetInsideInfilter(v);
            })
        });
    }

    users$ = this.insideFilterService.users$;
    counters$ = this.insideFilterService.counters$;
    services$ = this.insideFilterService.services$;
}
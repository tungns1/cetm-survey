import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IBranch, CacheBranch } from '../../model';
import { BranchFilterService } from './filter.service';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
    selector: 'branch-filter',
    templateUrl: 'filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchFilterComponent implements OnInit, AfterViewInit {

    constructor(
        private route: ActivatedRoute,
        private filterService: BranchFilterService
    ) { }

    form: FormArray;
    levels: number[];
    viewLevels: number[];
    data: Observable<IBranch[]>[] = [];

    ngOnInit() {
        this.levels = this.filterService.Levels;
        this.form = new FormArray(
            this.levels.map(i => new FormControl([]))
        );

        this.levels.forEach(i => {
            this.data[i] = this.makeData(i);
        });

        this.viewLevels = [].concat(this.levels).reverse();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const branch_id = this.filterService.getAllID();
            // delay the value change until the ui is ready
            this.form.setValue(branch_id, { emitEvent: true });
            this.form.valueChanges.subscribe(v => {
                this.filterService.SetData(v);
            });
        }, 100);
    }


    private makeData(i: number) {
        const parentForm = this.form.at(i + 1);
        const activeForm = this.form.at(i);
        const byLevel = CacheBranch.RxByLevel(i);
        if (!parentForm) {
            return byLevel;
        }

        return combineLatest(byLevel, parentForm.valueChanges).map(
            ([branches, parents]) => {
                const parent_id: string[] = parents;
                const value: string[] = activeForm.value;
                const updateValue = value.filter(id => {
                    const branch = CacheBranch.GetByID(id);
                    return parent_id.indexOf(branch.parent) !== -1;
                });
                setTimeout(_ => activeForm.setValue(updateValue));
                // children: only show if parent is on
                return branches.filter(b =>
                    parent_id.indexOf(b.parent) !== -1
                );
            }
        )
    }

}
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Org } from '../../model';
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
    data: Observable<Org.IBranch[]>[] = [];

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
        const branch_id = this.filterService.GetBranchID();
        // delay the value change until the ui is ready
        this.form.setValue(branch_id, { emitEvent: true, onlySelf: true });
        this.form.valueChanges.subscribe(v => {
            this.filterService.SetBranchID(v);
        })
    }


    private makeData(i: number) {
        const parentForm = this.form.at(i + 1);
        const activeForm = this.form.at(i);
        const byLevel = Org.CacheBranch.RxByLevel(i);
        if (!parentForm) {
            return byLevel;
        }

        return combineLatest(byLevel, parentForm.valueChanges).map(
            ([branches, parents]) => {
                const parent_id: string[] = parents;
                // children: only show if parent is on
                const shownBranches = branches.filter(b =>
                    parent_id.indexOf(b.parent) !== -1
                );
                const value: string[] = activeForm.value;
                const updateValue = value.filter(id => parent_id.indexOf(id) !== -1);
                // setTimeout(_ => activeForm.setValue(updateValue));
                return shownBranches;
            }
        )
    }

}
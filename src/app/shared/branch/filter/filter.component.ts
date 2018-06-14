import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IBranch, CacheBranch } from '../../model';
import { BranchFilterService } from './filter.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'branch-filter',
    templateUrl: 'filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchFilterComponent implements OnInit, AfterViewInit {

    constructor(
        private route: ActivatedRoute,
        private filterService: BranchFilterService,
    ) { }
    @Input() showStore;
    form: FormArray;
    levels: number[];
    viewLevels: number[];
    data: Observable<IBranch[]>[] = [];

    ngOnInit() {
        this.levels = this.filterService.levels;
        this.form = new FormArray(
            this.levels.map(i => new FormControl([]))
        );
        this.levels.forEach(i => {
            this.data[i] = this.makeData(i);
        });
        this.viewLevels = [].concat(this.levels).reverse();
        // không hiện store trên filter
        if (this.showStore === 'no') {
            this.viewLevels.splice(this.viewLevels.length -1, 1)
        }
        // List store
        this.data[0].subscribe(data => {
            this.filterService.getTestValue(data);
        })
       
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const branch_id = this.filterService.branches;
            // delay the value change until the ui is ready
            this.form.setValue(branch_id, { emitEvent: true });
            this.form.valueChanges.debounceTime(50).subscribe(v => {
                this.filterService.Setbranches(v);
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
                    return branch && parent_id.indexOf(branch.parent) !== -1;
                });
                if (updateValue.length < value.length) {
                    activeForm.setValue(updateValue)
                }
                // children: only show if parent is on
                return branches.filter(b =>
                    parent_id.indexOf(b.parent) !== -1
                );
            }
        )
    }

}
import {IBranch} from '../../model/branch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combinelatest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const RxBranches = new BehaviorSubject<IBranch[]>([]);
export const Branches = new Map<string, IBranch>();
export * from '../../model/branch';

RxBranches.subscribe(branches => {
    branches.forEach(b => Branches.set(b.id, b));
})

export class BranchInLevel {
    constructor(private level: number, private parents: BehaviorSubject<IBranch[]>) {
        const rxLevel = RxBranches.map(branches => branches.filter(b => b.level === level));
        Observable.combineLatest<IBranch[], IBranch[]>(rxLevel, parents).subscribe(v => {
            const branches = v[0].filter(b => !b.parent || v[1].some(p => b.parent === p.id));      
            branches.filter(b => !b.parent).forEach(b => b._checked = true);
            this.shown.next(branches);
        });
        this.shown.subscribe(branches => {
            this.selected.next(branches.filter(b => b._checked));
        });
        this.selected.subscribe(branches => {
            if (branches.length === 1) {
                this.onlyOne.next(branches[0]);
            } else {
                this.onlyOne.next(null);
            }
            this.selectedID.next(branches.map(b => b.id).join(','));
        })
    }

    shown = new BehaviorSubject<IBranch[]>([]);
    onlyOne = new BehaviorSubject<IBranch>(null);
    selected = new BehaviorSubject<IBranch[]>([]);
    selectedID = new BehaviorSubject<string>('');

    SelectOnlyID(id: string) {
        this.shown.value.forEach(b => {
            if (b.id === id) {
                b._checked = true;
            } else {
                b._checked = false;
            }
        });
        this.shown.next(this.shown.value);
    }

    ChangeByID(id: string, value: boolean) {
        this.shown.value.forEach(b => {
            if (b.id === id) {
                b._checked = value;
            }
        });

        this.shown.next(this.shown.value);
    }

    SelectAll() {
        this.shown.value.forEach(b => b._checked = true);
        this.shown.next(this.shown.value);
    }

    UnselectAll() {
        this.shown.value.forEach(b => b._checked = false);
    }

}


const Level3 = new BranchInLevel(3, new BehaviorSubject([]));
Level3.SelectAll();
const Level2 = new BranchInLevel(2, Level3.selected);
const Level1 = new BranchInLevel(1, Level2.selected);
const Level0 = new BranchInLevel(0, Level1.selected);
export const SelectedBranchIDLevel0 = Level0.selectedID;
export const OnlyOneSelectedBranchLevel0 = Level0.onlyOne;
export const AllLevels = [Level0, Level1, Level2, Level3];

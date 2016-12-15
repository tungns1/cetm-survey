import { IBranch } from '../../model/branch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combinelatest';
import 'rxjs/add/operator/map';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const RxBranches = new BehaviorSubject<IBranch[]>([]);
export const Branches = new Map<string, IBranch>();
export * from '../../model/branch';


const LevelRoot = new BehaviorSubject<IBranch[]>([]);

RxBranches.subscribe(branches => {
    if (branches.length < 1) {
        return;
    }

    let branchMax = branches[0];
    branches.forEach(b => Branches.set(b.id, b));
    branches.forEach(b => {
        if (branchMax.level < b.level) {
            branchMax = b;
        }
        let p = Branches.get(b.id);
        b.parent_name = (p && p.name) ? p.name : 'n/a';
    });
    LevelRoot.next([branchMax]);
})

export class BranchInLevel {
    constructor(private level: number, private parents: BehaviorSubject<IBranch[]>) {
        const rxLevel = RxBranches.map(branches => branches.filter(b => b.level === level));
        Observable.combineLatest<IBranch[], IBranch[]>(rxLevel, parents).subscribe(v => {
            const branches = v[0].filter(b => v[1].some(p => b.parent === p.id));
            // branches.forEach(b => b._checked = true);
            this.shown.next(branches);
        });
        this.shown.subscribe(branches => {
            this.selected.next(branches.filter(b => b._checked));
        });
    }

    shown = new BehaviorSubject<IBranch[]>([]);
    selected = new BehaviorSubject<IBranch[]>([]);

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

    None() {
        return this.selected.value.length === 0;
    }

}

const Level2 = new BranchInLevel(2, LevelRoot);
const Level1 = new BranchInLevel(1, Level2.selected);
const Level0 = new BranchInLevel(0, Level1.selected);


export const SelectedBranchIDLevel0 = new BehaviorSubject<string>('');
export const LowestLayerBranch = new BehaviorSubject<IBranch[]>([]);

Level0.selected.subscribe(branches => {
    SelectedBranchIDLevel0.next(branches.map(b => b.id).join(','));
});

export const AllLevels = [Level0, Level1, Level2];
import {combineLatest} from 'rxjs/observable/combineLatest';

function FindLowest() {
    let layer = LevelRoot;
    if (Level2.None()) {
        return layer;
    }
    layer = Level2.selected;
    if (Level1.None()) {
        return layer;
    }
    layer = Level1.selected;
    if (Level0.None()) {
        return layer;
    }
    
    layer = Level0.selected;
    return layer;
}

Level0.selected.subscribe(_ => {
    let layer = FindLowest();
    LowestLayerBranch.next(layer.value);
})

export function GetTreeNames(branch_id: string, level?: number) {
    let names = [];
    const branch_0 = Branches.get(branch_id) || { name: "n/a" };
    names.push(branch_0.name || "n/a");
    const branch_1 = Branches.get(branch_0.parent) || { name: 'n/a' };
    names.push(branch_1.name || "n/a");
    const branch_2 = Branches.get(branch_1.parent) || { name: "n/a" };
    names.push(branch_2.name || "n/a");
    return names;
}
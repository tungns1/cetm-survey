import { IBranch } from '../../model/branch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { combineLatest } from 'rxjs/observable/combineLatest';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const RxBranches = new BehaviorSubject<IBranch[]>([]);
export const Branches = new Map<string, IBranch>();
export * from '../../model/branch';

let maxLevel = 0;

export class BranchLayer {
    constructor(private level: number, private rxParents: BehaviorSubject<IBranch[]>) {
        combineLatest<IBranch[], IBranch[]>(RxBranches, rxParents).subscribe(
            ([branches, parents]) => {
                const layer = branches.filter(b => {
                    if (b.level === level) {
                        if (maxLevel <= level) {
                            b._checked = true;
                            return true;
                        }
                        b._checked = false;
                        return parents.some(p => b.parent === p.id);
                    }
                    return false;
                });
                this.shown.next(layer);
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

    Active() {
        return this.selected.value.length > 0;
    }

}


export const SelectedBranchIDLevel0 = new BehaviorSubject<string>('');
export const LowestLayerBranch = new BehaviorSubject<IBranch[]>([]);

const Level3 = new BranchLayer(3, new BehaviorSubject<IBranch[]>([]));
const Level2 = new BranchLayer(2, Level3.selected);
const Level1 = new BranchLayer(1, Level2.selected);
const Level0 = new BranchLayer(0, Level1.selected);
export const AllLayers: BranchLayer[] = [Level0, Level1, Level2, Level3];

Level0.selected.subscribe(branches => {
    SelectedBranchIDLevel0.next(branches.map(b => b.id).join(','));
    let layer = FindLowest();
    LowestLayerBranch.next(layer.selected.value);
});

export const RxMax = new BehaviorSubject<IBranch>(null);

export function SetBranches(branches: IBranch[], maxBranchID: string) {
    let branch = branches.find(b => b.id === maxBranchID);
    maxLevel = branch? branch.level : 0;
    branches.forEach(b => Branches.set(b.id, b));
    branches.forEach(b => {
        let p = Branches.get(b.id);
        b.parent_name = (p && p.name) ? p.name : 'n/a';
    });
    branches= branches.filter(b => b.level < maxLevel);
    branches.push(branch);
    RxBranches.next(branches);
    RxMax.next(branch);
}

function FindLowest() {
    let i = 0;
    for (i = 0; i <= maxLevel; i++) {
        let layer = AllLayers[i];
        if (layer.Active()) {
            return layer;
        }
    }
    return Level3;
}

export function GetTreeNames(branch_id: string, level?: number) {
    let names = [];
    let branch = Branches.get(branch_id) || { name: "n/a" };
    for (let i = 0; i < AllLayers.length; i++) {
        names.push(branch.name || "n/a");
        branch = Branches.get(branch.parent) || { name: 'n/a' };
    }
    return names;
}

export function GetLayer(level: number) {
    return AllLayers[level];
}

export function GetMax() {
    return maxLevel;
}

export function GetName(branch_id: string) {
    var branch = Branches.get(branch_id);
    return branch? branch.name : 'n/a';
}
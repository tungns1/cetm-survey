import { Org } from '../model/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class BranchLayer {
    constructor(private level: number, private rxParents: BehaviorSubject<Org.IBranch[]>) {
        combineLatest<Org.IBranch[], Org.IBranch[]>(Org.CacheBranch.RxListView, rxParents).subscribe(
            ([branches, parents]) => {
                const maxLevel = Org.CacheBranch.GetMaxLevel();
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

    shown = new BehaviorSubject<Org.IBranch[]>([]);
    selected = new BehaviorSubject<Org.IBranch[]>([]);

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
export const LowestLayerBranch = new BehaviorSubject<Org.IBranch[]>([]);

const Level3 = new BranchLayer(3, new BehaviorSubject<Org.IBranch[]>([]));
const Level2 = new BranchLayer(2, Level3.selected);
const Level1 = new BranchLayer(1, Level2.selected);
const Level0 = new BranchLayer(0, Level1.selected);
export const AllLayers: BranchLayer[] = [Level0, Level1, Level2, Level3];

Level0.selected.subscribe(branches => {
    SelectedBranchIDLevel0.next(branches.map(b => b.id).join(','));
    let layer = FindLowest();
    LowestLayerBranch.next(layer.selected.value);
});

function FindLowest() {
    let i = 0;
    const maxLevel = Org.CacheBranch.GetMaxLevel();
    for (i = 0; i <= maxLevel; i++) {
        let layer = AllLayers[i];
        if (layer.Active()) {
            return layer;
        }
    }
    return Level3;
}

export function GetLayer(level: number) {
    return AllLayers[level];
}


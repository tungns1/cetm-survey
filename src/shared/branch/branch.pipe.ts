
import { Pipe, PipeTransform } from '@angular/core';
import { IBranch, RxBranches } from './branch';

var branchNames = {};

RxBranches.subscribe(branches => {
    branches.forEach(b => branchNames[b.id] = b.name);
})

@Pipe({
    name: 'branchName'
})
export class BranchNamePipe implements PipeTransform {
    transform(id: string) {
        return branchNames[id];
    }
}


export const Levels = [
    'LABEL_SUB_BRANCH',
    'LABEL_BRACH',
    'AREA',
    'LABEL_ROOT'
]

@Pipe({
    name: 'levelName'
})
export class LevelNamePipe implements PipeTransform {
    transform(id: number) {
        return Levels[id];
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { BranchLevels, CacheBranch } from '../model';

@Pipe({
    name: 'branchLevelName'
})
export class BranchLevelNamePipe implements PipeTransform {
    transform(id: number) {
        return BranchLevels[id].name;
    }
}

@Pipe({
    name: 'branchName'
})
export class BranchNamePipe implements PipeTransform {
    transform(id: string) {
        return CacheBranch.GetNameForID(id);
    }
}
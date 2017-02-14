
import { Pipe, PipeTransform } from '@angular/core';
import { Org } from '../model';

@Pipe({
    name: 'branchLevelName'
})
export class BranchLevelNamePipe implements PipeTransform {
    transform(id: number) {
        return Org.BranchLevels[id].name;
    }
}

@Pipe({
    name: 'branchName'
})
export class BranchNamePipe implements PipeTransform {
    transform(id: string) {
        return Org.CacheBranch.GetNameForID(id);
    }
}
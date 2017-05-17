
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
@Pipe({
    name: 'parentName'
})
export class ParentNamePipe implements PipeTransform {
    transform(id: string) {
        let b= CacheBranch.GetForID(id);
        return CacheBranch.GetNameForID(b.parent);
    }
}
@Pipe({
    name: 'parentCode'
})
export class ParentCodePipe implements PipeTransform {
    transform(id: string) {
        let b= CacheBranch.GetForID(id);
        return CacheBranch.GetCodeForID(b.parent);
    }
}
@Pipe({
    name: 'branchCode'
})
export class BranchCodePipe implements PipeTransform {
    transform(id: string) {
        return CacheBranch.GetCodeForID(id);
    }
}


@Pipe({
    name: 'branchKioskName'
})
export class BranchNameKioskPipe implements PipeTransform {
    transform(id: string) {
        return CacheBranch.GetNameForID(id);
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Org, RxBranches } from './branch';

export const Levels = [
    'LABEL_SUB_BRANCH',
    'LABEL_BRANCH',
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
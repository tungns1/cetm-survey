import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rawResource'
})
export class RawResourcePipe implements PipeTransform {

    transform(value: Object) {
        let lines: string[] = [];
        if (!value) {
            return 'n/a';
        }
        if (typeof value === 'string') {
            lines = [value];
        }
        if (typeof value === 'object') {
            lines = Object.keys(value).map(k => {
                return `<li>${k}:  ${JSON.stringify(value[k])}</li>`;
            });;
        }
        return `<ul>${lines.join("")}<ul>`;
    }
}
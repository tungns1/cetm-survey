import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "key"
})
export class KeyPipe implements PipeTransform {
    transform(v: any) {
        let result = Object.keys(v)
        return result;
    }
}
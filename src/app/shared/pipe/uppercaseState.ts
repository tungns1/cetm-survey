
import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
    name: 'uppercaseFirst'
})
export class UppercaseFirstState implements PipeTransform {
    transform(state: string) {
        return state.charAt(0).toUpperCase() + state.slice(1);
    }
}
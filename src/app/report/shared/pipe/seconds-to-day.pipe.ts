import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToDay'
})
export class SecondsToDayPipe implements PipeTransform {

    transform(seconds: number): any {
        var days = +(seconds / (3600*24)).toFixed(1);
        return days;
    } 

}

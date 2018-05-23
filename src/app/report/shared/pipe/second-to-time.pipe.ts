import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secondToTime'
})
export class SecondToTimePipe implements PipeTransform {
    times = {
        // day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    }
    
    // transform(seconds){
    //     console.log(seconds)
    //     let time_string: string = '';
    //     let plural: string = '';
    //     for(var key in this.times){
    //         if(Math.floor(seconds / this.times[key]) > 0){

    //             time_string += Math.floor(seconds / this.times[key])+ ':';
    //             seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);

    //         }else{
    //             time_string += '00'
    //         }
    //     }
    //     console.log(time_string)
    //     return time_string;
    // }

    transform(seconds:number):any{
        var date = new Date(null);
        date.setSeconds(seconds)    
        var result = date.toISOString().substr(11, 8);
        return result;
    }

}

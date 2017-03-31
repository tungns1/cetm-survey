
import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
    name: 'timeToDate'
})
export class TimeToDate implements PipeTransform {
    transform(s: number) {
        if (s < 0) {
            return '';
        } else {
            var d = new Date(s * 1000),
                yyyy = d.getFullYear(),
                mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
                dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
                hh = d.getHours(),
                h = hh,
                min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
                time;



            // ie: 2013-02-18, 8:35 AM	
            time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min;

            return time;
        }

    }
}
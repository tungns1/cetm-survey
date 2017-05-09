import { Pipe } from '@angular/core';
import { IActivity, ActivityCategory } from '../model/';


@Pipe({
    name: 'statusDevice'
})
export class StatusDevicePipe {
    transform(s: IActivity) {
        console.log(s)
        if (s) {
            if (s.ref = 0) {
                return "off"
            } else {
                if (s.cat = ActivityCategory.Categories.Counter) {
                    return "on"
                } else {
                    if (s.data!=null && s.data.ps!=""){
                        return "printer";
                    }else{
                        return "printer error";
                    }
                }
            }
        }
    }
}
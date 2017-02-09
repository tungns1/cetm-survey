import { FormBuilder, Validators } from '@angular/forms';
import {SharedService } from '../../shared/';
import { ISetting } from '../../model/setting';

export const Api = new SharedService.Backend.HttpApi<ISetting>("/api/setting");


import { Observable } from 'rxjs/Observable';



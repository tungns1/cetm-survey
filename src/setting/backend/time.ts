import { FormBuilder, Validators } from '@angular/forms';
import { Model, Backend } from '../../shared/';

export const Api = new Backend.HttpApi<Model.ISetting>("/api/setting");


import { Observable } from 'rxjs/Observable';



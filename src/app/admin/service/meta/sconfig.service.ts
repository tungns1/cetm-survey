import { Injectable } from '@angular/core';
import { CrudApiService } from '..';
import { SystemConfig } from '../../../shared/model/meta/system_config';

@Injectable()
export class SconfigService extends CrudApiService<SystemConfig>{
    

}

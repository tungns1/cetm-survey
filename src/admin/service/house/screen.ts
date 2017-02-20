import { Injectable } from '@angular/core';
import { Model } from '../../shared/';
import { BranchCrudApiService, AdminFilter } from '../shared';

@Injectable()
export class ScreenService extends BranchCrudApiService<Model.House.IScreen> {
    Name = "LABEL_SCREEN";
}

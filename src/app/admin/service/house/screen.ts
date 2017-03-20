import { Injectable } from '@angular/core';
import { BranchCrudApiService, AdminFilter, IScreen } from '../shared';

@Injectable()
export class ScreenService extends BranchCrudApiService<IScreen> {
    Name = "Screen";
}

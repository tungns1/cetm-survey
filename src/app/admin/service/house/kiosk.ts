import { Injectable } from '@angular/core';
import { BranchCrudApiService, AdminFilter, IKiosk } from '../shared';

@Injectable()
export class KioskService extends BranchCrudApiService<IKiosk> {
    Name = "Kiosk";
}

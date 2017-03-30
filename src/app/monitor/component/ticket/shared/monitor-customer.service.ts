import { Injectable } from '@angular/core';
import {
  HttpServiceGenerator
} from '../../shared';

import { ICustomer } from '../../../model';

@Injectable()
export class MonitorCustomerService {

  constructor(
    private httpSG: HttpServiceGenerator
  ) { }

  GetCustomerByID(id: string) {
    return this.api.Get<ICustomer>("get_customer_by_id", { id });
  }

  GetUserByRoleNBranch(branch_id: string, role: string) {
    return this.apiReport.Get<ICustomer>("get_user_by_branch_id", { branch_id, role });
  }

  private api = this.httpSG.make("/api/monitor");
  private apiReport = this.httpSG.make("/api/report/user");
}

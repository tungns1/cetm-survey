import { Injectable } from '@angular/core';
import { HttpServiceGenerator, IUser } from '../shared';
import { ICustomer } from '../shared';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ReportCustomerService {

  constructor(
    private httpSG: HttpServiceGenerator
  ) { }

  GetCustomerByID(id: string) {
    return this.api.Get<ICustomer>("get_customer_by_id", { id });
  }

  GetUserByRoleNBranch(branch_id: string, role: string) {
    const key = `${branch_id}_${role}`;
    const v = this.cacheUser.get(key);
    if (v) {
      return of(v);
    }
    return this.apiReport.Get<IUser[]>("get_user_by_branch_id", { branch_id, role })
      .pipe(tap(v => {
        this.cacheUser.set(key, v);
      }));
  }

  private api = this.httpSG.make("/api/monitor");
  private apiReport = this.httpSG.make("/api/report/user");
  private cacheUser = new Map<string, IUser[]>();
}

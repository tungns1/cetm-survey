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

  private api = this.httpSG.make("/api/monitor");
}

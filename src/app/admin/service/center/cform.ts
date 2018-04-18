import { Injectable } from '@angular/core';
import { RuntimeEnvironment } from '../../../shared/env/shared/env';
// import { Http } from '@angular/http/src/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppStorage } from '../../../../store/index';

@Injectable()
export class CustomFormService {
  constructor(
    private env: RuntimeEnvironment,
    private httpClient: HttpClient,
    // private http: Http
  ) {

  }
  session: string
  getDataForm() {

    return [{ 'db_name': 'dsda' }, { 'db_name': 'dsda' }, { 'db_name': 'dsda' }]
  }
  getApi(): Observable<any> {
    return this.httpClient.get(this.env.generateHostName(8000))
  }
  postApi(data): Observable<any> {
    return this.httpClient.post(this.env.generateHostName(8000), {})
  }
  deleteForm(id): Observable<any> {
    this.session = AppStorage.Token

    return this.httpClient.post(this.env.generateHostName(8888) + "/api/admin/house/form/del_form?token=" + this.session +"&id="+ id, {})
  }
  getAllCol(): Observable<any> {
    this.session = AppStorage.Token

    return this.httpClient.get(this.env.generateHostName(8888) + "/api/admin/house/form/get_col?token=" + this.session)
  }
  getAllForm(): Observable<any> {
    this.session = AppStorage.Token

    return this.httpClient.get(this.env.generateHostName(8888) + "/api/admin/house/form/get_all_form?token=" + this.session)
  }
  getFormBySerId(ser_id): Observable<any> {
    this.session = AppStorage.Token

    return this.httpClient.get(this.env.generateHostName(8888) + "/api/admin/house/form/get_form?token=" + this.session + "&service_id=" + ser_id)
  }
  getSerForm(): Observable<any> {
    this.session = AppStorage.Token

    return this.httpClient.get(this.env.generateHostName(8888) + "/api/admin/house/form/get_sers_form?token=" + this.session)
  }
  createForm(data): Observable<any> {
    this.session = AppStorage.Token

    return this.httpClient.post(this.env.generateHostName(8888) + "/api/admin/house/form/add_form?token=" + this.session, data)
  }
  FillForm(data): Observable<any> {
    this.session = AppStorage.Token

    return this.httpClient.post(this.env.generateHostName(8888) + "/api/admin/house/form/add_data?token=" + this.session, data)
  }
}

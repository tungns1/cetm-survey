import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/fromPromise';
import * as Loading from './loading';

interface IResponse<T> {
  status: string;
  data: T;
  error: any;
}

interface HttpResponse {
  status: number;
  body: string;
}

function serialize(query?: Object) {
  if (!query) {
    return '';
  }
  var str = [];
  Object.keys(query).forEach(k => {
    if (query.hasOwnProperty(k)) {
      str.push(encodeURIComponent(k) + "=" + encodeURIComponent(query[k]));
    }
  })
  return str.join("&");
}

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_UNAUTHORIZED = 401;
const JSON_STATUS_SUCCESS = "success";
const JSON_STATUS_ERROR = "error";
const JSON_STATUS_UNAUTHORIZED = "unauthorized";
const HTTP_METHOD_GET = "get";
const HTTP_METHOD_POST = "post";

function http(method: string, url: string, body?: any) {
  return new Observable<HttpResponse>((observer: Observer<HttpResponse>) => {
    Loading.Show();
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
    xhr.onload = e => {
      Loading.Hide();
      observer.next({ status: xhr.status, body: xhr.response });
      observer.complete();
    }

    xhr.onerror = e => {
      Loading.Hide();
      observer.error(errConnectionError);
      observer.complete();
    }
  });
}

const errResponseFormat = new Error("invalid response format");
const errConnectionError = new Error("connection error");
const errUnauthorized = new Error("unauthorized");

export function IsErrUnauthorized(err: Error) {
  return err === errUnauthorized;
}

function convertJSON<T>(data: HttpResponse) {
  if (data.status === HTTP_STATUS_UNAUTHORIZED) {
    throw errUnauthorized;
  }
  let o: IResponse<T>;
  try {
    o = JSON.parse(data.body);
  } catch (e) {
    throw errResponseFormat;
  }
  if (o.status === JSON_STATUS_SUCCESS) {
    return o.data;
  } else {
    throw o.error;
  }
}

import 'rxjs/add/operator/map';

export function MakeURL(url: string, query?: Object) {
  return `${url}?${serialize(query)}`;
}

export function GetJSON<T>(url: string, query?: Object) {
  return http(HTTP_METHOD_GET, MakeURL(url, query)).map(text => convertJSON<T>(text));
}

export function PostJSON<T>(url: string, query?: Object, data?: Object) {
  var body = JSON.stringify(data);
  return http(HTTP_METHOD_POST, MakeURL(url, query), body).map(text => convertJSON<T>(text));
}


// useful to upload file
export function PostForm(url: string, data?: Object) {
  var form = new FormData()
  if (data) {
    Object.keys(data).forEach(k => {
      form.append(k, data[k])
    })
  }
  return http(HTTP_METHOD_POST, url, form);
}

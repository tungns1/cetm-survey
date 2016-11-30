import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/fromPromise';
import * as Loading from './loading';

interface IResponse<T> {
  status: string;
  data: T;
  error: any;
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
const JSON_STATUS_SUCCESS = "success";
const JSON_STATUS_ERROR = "error";
const HTTP_METHOD_GET = "get";
const HTTP_METHOD_POST = "post";

function http(method: string, url: string, body?: any) {
  Loading.Show();
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(body);

  return new Observable<string>((observer: Observer<string>) => {
    xhr.onload = e => {
      Loading.Hide();
      if (xhr.status === HTTP_STATUS_OK) {
        observer.next(xhr.response);
        observer.complete();
      } else {
        observer.error(xhr.response);
      }
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

function convertJSON<T>(text: string) {
  try {
    let o: IResponse<T> = JSON.parse(text);
    if (o.status === JSON_STATUS_SUCCESS) {
      return o.data;
    } else {
      throw o.data;
    }
  } catch (e) {
    throw errResponseFormat;
  }
}

import 'rxjs/add/operator/map';
export function GetJSON<T>(url: string, query?: Object) {
  url += "?" + serialize(query);
  return http(HTTP_METHOD_GET, url).map(text => convertJSON<T>(text));
}

export function PostJSON<T>(url: string, query?: Object, data?: Object) {
  url += "?" + serialize(query);
  var body = JSON.stringify(data);
  return http(HTTP_METHOD_POST, url, body).map(text => convertJSON<T>(text));
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

import { AppStorage } from '../shared';
import { Http, Request, Response, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';

export class HttpError {
    constructor(
        private status: number,
        private statusText: string,
        private message: string) {
        this.statusText = this.statusText.trim().toUpperCase();
    }

    IsUnauthorized() {
        return this.statusText === "UNAUTHORIZED";
    }

    Message() {
        return this.message;
    }
}

export class HttpApi<T> {

    constructor(
        private baseUrl: string,
        private http: Http
    ) {
    }

    get token() {
        return AppStorage.Token;
    }

    protected makeRequest(method: RequestMethod, subUri: string, query?: any, body?: any) {
        let params = new URLSearchParams();
        params.set("token", this.token);
        const url = `${this.baseUrl}/${subUri}`

        if (query) {
            Object.keys(query).forEach(k => {
                params.set(k, query[k]);
            });
        }

        return new Request({
            method, url, params, body
        });
    }

    private send(request: Request) {
        return this.http.request(request)
            .map(response => this.extractData(response))
            .catch(e => this.handleError(e));
    }

    MakeURL(sub: string, q?: any) {
        const request = this.makeRequest(RequestMethod.Get, sub, q);
        return request.url;
    }

    Get<T2>(sub: string, q?: any): Observable<T2> {
        const request = this.makeRequest(RequestMethod.Get, sub, q);
        return this.send(request);
    }

    Post<T2>(sub: string, q?: any, o?: any): Observable<T2> {
        const request = this.makeRequest(RequestMethod.Post, sub, q, o);
        return this.send(request);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return _throw(new HttpError(error.status, error.statusText, errMsg));
    }

}


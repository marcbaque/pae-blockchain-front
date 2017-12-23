import { Injectable } from '@angular/core';
import {
    Http,
    Headers,
    Response,
    XHRBackend
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {
    Observable,
    BehaviorSubject,
    Subject
} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class MiscService {

    constructor(
        private http: Http
    ) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

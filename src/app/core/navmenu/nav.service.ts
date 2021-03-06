
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Nav } from 'ngx-canaima';
@Injectable()
export class NavService {
    public navList: any[];
    public translations: any[];
    public openSideMenuSrc = new Subject<boolean>();
    public openSideMenu$ = this.openSideMenuSrc.asObservable();
    constructor(
        private http: Http
    ) {

    }

    /**
     * Init Service
     *
     * @memberof NavService
     */
    public init() {
        /* this.translateService.get(
        [
            'HOME',
            'SETTINGS'
        ]
        ).subscribe((arr) => {
            console.log('translates', arr);
            this.translations = arr;
        }); */
    }
    public getNavs(): Observable<Nav[]> {
        return new Observable((observer) => {
            setTimeout(() => {
                this.navList = [
                    new Nav({
                        _id: '1',
                        title: 'Dashboard',
                        slugName: 'dashboard',
                        prefix: 'mdi',
                        icon: 'home',
                        open: false,
                        sub: false
                    }),
                    new Nav({
                        _id: '2',
                        title: 'Events',
                        slugName: 'events',
                        prefix: 'mdi',
                        icon: 'ticket',
                        open: false,
                        sub: false
                    }),
                    new Nav({
                        _id: '3',
                        title: 'Blockchain Network',
                        slugName: 'network',
                        prefix: 'mdi',
                        icon: 'monitor',
                        open: false,
                        sub: false
                    })
                ];
                observer.next(this.navList);
                observer.complete();
            }, 100);
        });
    }
    public openSideMenu(open: boolean) {
        this.openSideMenuSrc.next(open);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}

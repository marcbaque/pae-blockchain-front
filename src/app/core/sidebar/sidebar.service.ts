import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SidebarService {
    public toggleSideMenuSrc = new Subject<boolean>();
    public toggleSideMenu$ = this.toggleSideMenuSrc.asObservable();
    // tslint:disable-next-line:no-empty
    constructor() {}
    public toggleSideMenu(toggle: boolean) {
        this.toggleSideMenuSrc.next(toggle);
    }
}

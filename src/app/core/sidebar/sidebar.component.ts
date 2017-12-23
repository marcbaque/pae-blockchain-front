import { VERSION } from './../constants';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Nav } from 'ngx-canaima';
import { NavService } from '../navmenu/nav.service';

@Component({
    selector: 'as-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: [
        './sidebar.component.scss'
    ]
})

export class SidebarComponent implements OnInit {
    public navs: Nav[] = [];
    public photo: string;
    public version = VERSION;
    constructor(
        public navService: NavService
    ) { }

    public ngOnInit() {
        this.navService.getNavs()
        .subscribe((res: Nav[]) => {
            this.navs = res;
        });
    }
}

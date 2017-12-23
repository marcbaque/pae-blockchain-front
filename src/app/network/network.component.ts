import { DOCUMENT } from '@angular/platform-browser';
import { SidebarService } from '../core/sidebar/sidebar.service';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject
} from '@angular/core';
import { Action } from 'ngx-canaima';
import { Router } from '@angular/router';

@Component({

    templateUrl: 'network.component.html',
    styleUrls: [
        './network.component.scss',
    ]
})
export class NetworkComponent implements OnInit {
    constructor(
      @Inject(DOCUMENT) private document: any,
      public sidebarService: SidebarService,
      public router: Router
    ) { }

    public ngOnInit() {

    }

}

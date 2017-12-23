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

    templateUrl: 'dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss',
    ]
})
export class DashboardComponent implements OnInit {
    public eventForm = {
      name: ""
    }
    constructor(
      @Inject(DOCUMENT) private document: any,
      public sidebarService: SidebarService,
      public router: Router
    ) { }

    public ngOnInit() {

    }

    public createEvent() {
      // Use this.eventForm
      console.log(this.eventForm)
    }

}

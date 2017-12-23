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

    templateUrl: 'events.component.html',
    styleUrls: [
        './events.component.scss',
    ]
})
export class EventsComponent implements OnInit {
    public events = [
        {
            text: "Evento 1",
            date: "2 seconds ago"
        },
        {
            text: "Evento 1",
            date: "2 seconds ago"
        },
        {
            text: "Evento 1",
            date: "2 seconds ago"
        },
        {
            text: "Evento 1",
            date: "2 seconds ago"
        },
        {
            text: "Evento 1",
            date: "2 seconds ago"
        },
        {
            text: "Evento 1",
            date: "2 seconds ago"
        }
    ]
    constructor(
      @Inject(DOCUMENT) private document: any,
      public sidebarService: SidebarService,
      public router: Router
    ) { }

    public ngOnInit() {
        //this.getEvents();
    }

    public getEvents() {
        // Get some events
        //

        this.events = [];
    }

}

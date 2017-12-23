import { Routes } from '@angular/router';
import { EventsComponent } from 'app/events/events.component';

export const ROUTES: Routes = [
    {
         path: 'events',
         component: EventsComponent,
         // canActivate: [AuthGuard]
    },
];

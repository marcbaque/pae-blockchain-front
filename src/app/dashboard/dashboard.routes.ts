import { Routes } from '@angular/router';
import { DataResolver } from '../app.resolver';
import { DashboardComponent } from './dashboard.component';

export const ROUTES: Routes = [
    {
         path: 'dashboard',
         component: DashboardComponent,
         // canActivate: [AuthGuard]
    },
];

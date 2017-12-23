import { Routes } from '@angular/router';

import { DataResolver } from './app.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';

export const ROUTES: Routes = [
  { path: '',  component: DashboardComponent },
];


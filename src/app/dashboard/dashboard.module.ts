import { NgModule } from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { ROUTES } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    imports: [
        SharedModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })

    ],
    exports: [
        DashboardComponent
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [],
})
export class DashboardModule { }

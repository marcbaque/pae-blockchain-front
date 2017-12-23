import { NgModule } from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { ROUTES } from './network.routes';
import { SharedModule } from '../shared/shared.module';
import { NetworkComponent } from 'app/network/network.component';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })

    ],
    exports: [
        NetworkComponent
    ],
    declarations: [
        NetworkComponent
    ],
    providers: [],
})
export class NetworkModule { }

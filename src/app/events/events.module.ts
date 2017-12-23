import { NgModule } from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { ROUTES } from './events.routes';
import { SharedModule } from '../shared/shared.module';
import { EventsComponent } from 'app/events/events.component';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })

    ],
    exports: [
        EventsComponent
    ],
    declarations: [
        EventsComponent
    ],
    providers: [],
})
export class EventsModule { }

import { NgModule } from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { ROUTES } from './events.routes';
import { SharedModule } from '../shared/shared.module';
import { EventsComponent } from 'app/events/events.component';
import { RelativeTimeFilterPipe } from 'app/events/date.pipe';
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })

    ],
    exports: [
        EventsComponent
    ],
    declarations: [
        RelativeTimeFilterPipe,
        EventsComponent
    ],
    providers: [],
})
export class EventsModule { }

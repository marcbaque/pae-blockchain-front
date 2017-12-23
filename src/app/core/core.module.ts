import { MiscModule } from './misc/misc.module';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { MiscService } from './misc/misc.service';
import { ToastyModule } from 'ng2-toasty';
import { SidebarModule } from 'ng-sidebar';

import { AsSidebarModule } from './sidebar/sidebar.module';
import { LoginModule } from '../login/login.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { NavbarModule } from './navbar/navbar.module';

import { NavService } from './navmenu/nav.service';
import { NetworkModule } from 'app/network/network.module';
import { EventsModule } from 'app/events/events.module';
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        NavbarModule,
        DashboardModule,
        NetworkModule,
        EventsModule,
        ToastyModule,
        AsSidebarModule,
        MiscModule,
        SidebarModule.forRoot(),
    ],
    exports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        NavbarModule,
        DashboardModule,
        NetworkModule,
        EventsModule,
        ToastyModule,
        SidebarModule,
        AsSidebarModule,
        MiscModule,
    ],
    declarations: [
    ],
    providers: [
        NavService
    ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

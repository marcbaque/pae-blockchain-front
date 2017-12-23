import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarService } from './sidebar.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        SidebarComponent
    ],
    declarations: [
        SidebarComponent
    ],
    providers: [
        SidebarService
    ],
})
export class AsSidebarModule { }

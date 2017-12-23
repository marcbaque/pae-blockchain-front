
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './card.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ],
    exports: [
        CardComponent
    ],
    declarations: [
        CardComponent,
    ],
    providers: [],
})
export class CardModule { }

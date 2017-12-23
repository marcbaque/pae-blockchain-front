import { NgModule } from '@angular/core';
import {
    CommonModule
  } from '@angular/common';
import {
    FormsModule
} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {
  TranslateHttpLoader
} from '@ngx-translate/http-loader';
import { NavbarModule } from './navbar/navbar.module';
import { NgxCanaimaModule } from 'ngx-canaima';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from './card/card.module';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CommonModule,
        HttpClientModule,
        FlexLayoutModule,
        CardModule,
        NgxCanaimaModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
    ],
    exports: [
        CommonModule,
        FormsModule,
        CardModule,
        HttpClientModule,
        FlexLayoutModule,
        NgxCanaimaModule
    ],
    declarations: [],
    providers: [],
})
export class SharedModule { }

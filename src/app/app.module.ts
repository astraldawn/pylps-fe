import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AceEditorModule } from 'ng2-ace-editor';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './router';

import { CompilerService } from './compiler.service';
import { EgloaderService } from './egloader.service';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { DisplayComponent } from './display/display.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { MainNavComponent } from './main-nav/main-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DisplayComponent,
    NavbarComponent,
    MainComponent,
    PagenotfoundComponent,
    HomepageComponent,
    AboutpageComponent,
    MainNavComponent
  ],
  imports: [
    RouterModule.forRoot(
      AppRoutes
    ),
    AceEditorModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [CompilerService, EgloaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

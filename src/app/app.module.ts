import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AceEditorModule } from 'ng2-ace-editor';

import { CompilerService } from './compiler.service';
import { EgloaderService } from './egloader.service';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { DisplayComponent } from './display/display.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DisplayComponent,
    NavbarComponent
  ],
  imports: [
    AceEditorModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [CompilerService, EgloaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

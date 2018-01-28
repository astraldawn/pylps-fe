import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AceEditorModule } from 'ng2-ace-editor';


import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

import { CompilerService } from './compiler.service';
import { DisplayComponent } from './display/display.component'


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DisplayComponent
  ],
  imports: [
    AceEditorModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [CompilerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

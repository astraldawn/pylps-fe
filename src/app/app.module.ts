import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AceEditorModule } from 'ng2-ace-editor';


import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

import { CompilerService } from './compiler.service'


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent
  ],
  imports: [
    AceEditorModule,
    BrowserModule,
    HttpModule
  ],
  providers: [CompilerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

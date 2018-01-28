import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AceEditorModule } from 'ng2-ace-editor';


import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent
  ],
  imports: [
    AceEditorModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

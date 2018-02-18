import * as ace from 'brace';
import 'brace/mode/python';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CompilerService } from '../compiler.service';
import { EgloaderService } from '../egloader.service';

import { PROGRAMS } from '../programs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editor;
  currentProgram: string;
  egloaderServiceSubscription: Subscription;

  constructor(
    private compilerService: CompilerService,
    private egloaderService: EgloaderService
   ) {
    this.currentProgram = PROGRAMS.MAP_COLOURING;
    this.egloaderServiceSubscription = egloaderService.program$.subscribe(
      newProgram => {
        this.currentProgram = newProgram;
      }
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.editor.setOptions({
         fontSize: "12pt"
      });

      this.editor.getEditor().focus();
  }

  runProgram() {
    this.compilerService.runProgram(this.currentProgram);
  }

}

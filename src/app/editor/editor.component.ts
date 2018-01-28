import * as ace from 'brace';
import 'brace/mode/python';

import { Component, OnInit, ViewChild } from '@angular/core';
import { CompilerService } from '../compiler.service';
import { PROGRAMS } from '../programs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editor;
  program: string = PROGRAMS.RECURRENT_FIRE;

  constructor(private compilerService: CompilerService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.editor.setOptions({
         fontSize: "12pt"
      });

      this.editor.getEditor().focus();
  }

  runProgram(event) {
    this.compilerService.runProgram(this.program);
  }

}

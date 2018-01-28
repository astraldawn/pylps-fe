import { Component, OnInit, ViewChild } from '@angular/core';
import * as ace from 'brace';
import 'brace/mode/python';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editor;
  content: string = `from pylps.core import *


initialise(max_time=5)  # Assume all time variables created here

create_fluents('fire')
create_actions('eliminate', 'escape')
create_events('deal_with_fire')

initially(fire)

reactive_rule(fire.at(T1)).then(
    deal_with_fire.frm(T1, T2))

goal(deal_with_fire.frm(T1, T2)).requires(
    eliminate.frm(T1, T2))

goal(deal_with_fire.frm(T1, T2)).requires(
    escape.frm(T1, T2))

eliminate.terminates(fire)

execute()

show_kb_log()`;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
      // this.editor.setTheme("eclipse");

      // this.editor.getEditor().setOptions({
      //     enableBasicAutoCompletion: true
      // });

      this.editor.getEditor().commands.addCommand({
          name: "showOtherCompletions",
          bindKey: "Ctrl-Enter",
          exec: function (editor) {
            console.log(editor.getValue())
          }
      })

      this.editor.getEditor().focus();
  }

}

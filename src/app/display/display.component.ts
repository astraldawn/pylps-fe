import { Component, OnDestroy } from '@angular/core';
import { CompilerService } from '../compiler.service';
import { Subscription } from 'rxjs/Subscription';
import { Output } from '../output';
import { Outputslot } from '../outputslot'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnDestroy {

  private START_STRING: string = "Compile a program to see something"
  private DEFAULT_OUTPUT: Output = new Output('action', 'a', 'a', 0);
  private currentContent: string;
  currentDisplayString: string;
  currentOutput: Outputslot[];
  hasOutput: boolean = false;
  outputArr: Output[] = [];

  compilerServiceSubscription: Subscription;

  constructor(private compilerService: CompilerService) {
    this.currentDisplayString = this.START_STRING;
    this.processOutput();
    this.compilerServiceSubscription = compilerService.content$.subscribe(
      newContent => {
        this.currentContent = newContent;
        this.processContent();
        this.processOutput();
      }
    );
  }

  private processContent() {
    if (this.currentContent.includes("SyntaxError")) {
      this.currentDisplayString = this.currentContent
      this.hasOutput = false
      return
    }
    var contentArray = this.currentContent.split(/[\r\n]+/);
    var item = contentArray[0]

    // Remove item at the end
    contentArray = contentArray.slice(0, contentArray.length - 1)

    if (item == 'Exec') {
      this.currentDisplayString = 'Processing'
      this.hasOutput = false
      return
    }

    this.hasOutput = true;

    this.outputArr = []
    for (let item of contentArray) {
      var indices = []
      var openBrace = false
      item = item.slice(1, item.length - 1)
      for (var i = 0; i < item.length; i++) {
        if (item[i] === '(' || item[i] === '[') openBrace = true
        if (item[i] === ')' || item[i] === ']') openBrace = false
        if (item[i] === ',' && !openBrace) indices.push(i)
      }
      const type = item.slice(0, indices[0]).replace(/'/g, "")
      const name = item.slice(indices[0] + 2, indices[1]).replace(/'/g, "")
      const args = item.slice(indices[1] + 2, indices[2]).replace(/'/g, "")
      const time = item.slice(indices[2] + 2, )

      const time_arr = time.split(',')

      var endTime = 0;

      if (time_arr.length == 1) {
        endTime = parseInt(time_arr[0])
      } else {
        endTime = parseInt(time_arr[1].slice(1, time_arr[1].length - 1))
      }

      this.outputArr.push(new Output(type, name, args, endTime))
    }
  }

  private processOutput() {
    if (this.outputArr.length == 0) {
      this.hasOutput = false
      return
    }
    this.currentOutput = [new Outputslot(0, [], [])]

    for (let item of this.outputArr) {
      var last_time = this.currentOutput[this.currentOutput.length - 1].endTime
      if (item.endTime != last_time) {
        this.currentOutput.push(new Outputslot(item.endTime, [], []))
      }

      if (item.type.includes("action")) {
        this.currentOutput[this.currentOutput.length - 1].actions.push(item)
        continue
      }

      if (item.type.includes("fluent")) {
        const type_split = item.type.split('_')
        item.type = type_split[1]
        this.currentOutput[this.currentOutput.length - 1].fluents.push(item)
        continue
      }
    }
  }


  ngOnDestroy() {
    this.compilerServiceSubscription.unsubscribe();
  }

}

import { Component, OnDestroy } from '@angular/core';
import { CompilerService } from '../compiler.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnDestroy {

  private START_STRING: string = "Compile a program to see something"
  currentContent: string;
  compilerServiceSubscription: Subscription;

  constructor(private compilerService: CompilerService) {
    this.currentContent = this.START_STRING;
    this.compilerServiceSubscription = compilerService.content$.subscribe(
      newContent => {
        this.currentContent = newContent
      }
    );
  }


  ngOnDestroy() {
    this.compilerServiceSubscription.unsubscribe();
  }

}

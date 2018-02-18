import { Component, OnInit } from '@angular/core';
import { EgloaderService } from '../egloader.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private egloaderService: EgloaderService) { }

  ngOnInit() {
  }

  loadExample(exampleName:string) {
    this.egloaderService.displayProgram(exampleName);
  }

}

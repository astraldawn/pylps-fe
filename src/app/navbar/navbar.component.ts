import { Component, OnInit } from '@angular/core';
import { EgloaderService } from '../egloader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private egloaderService: EgloaderService) { }

  ngOnInit() {
  }

  loadExample(exampleName:string) {
    this.egloaderService.displayProgram(exampleName);
  }

}

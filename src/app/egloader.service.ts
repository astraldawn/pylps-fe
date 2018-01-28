import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { PROGRAMS } from './programs';

@Injectable()
export class EgloaderService {
  // Constants
  private NOT_FOUND: string = 'Example program is not found';

  // Observable sources
  private programSource = new Subject<string>();

  // Observable streams
  program$ = this.programSource.asObservable();

  constructor() { }

  displayProgram(programName:string) {
    var program = PROGRAMS[programName] ? PROGRAMS[programName] : this.NOT_FOUND;

    this.programSource.next(program);
  }

}

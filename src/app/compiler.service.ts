import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class CompilerService {

  constructor(private http: Http) { }

  runProgram(program:string) {
    console.log('compiler service called')
    console.log(program)
  }

}

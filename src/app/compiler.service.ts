import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CompilerService {
  // Constants
  private COMPILER_URL: string = 'https://compiler.astraldawn.com/compile';
  private LANG_ID: number = 0;
  private DEF_STDIN: string = '';

  // Observable sources
  private contentSource = new Subject<string>();

  // Observable streams
  content$ = this.contentSource.asObservable();

  constructor(private http: HttpClient) {
  }

  runProgram(program:string) {
    var input = {
      'language': this.LANG_ID,
      'stdin': this.DEF_STDIN,
      'code': program
    };

    this.http.post(this.COMPILER_URL, input).subscribe(
      res => {
        var errors = res['errors'];
        var output = res['output'];
        if (errors) {
          this.contentSource.next(errors);
        } else {
          this.contentSource.next(output);
        }
      },
      err => {
        console.log(err);
      }
    )

    this.contentSource.next("Exec");
  }

}

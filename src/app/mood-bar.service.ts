/**
 * Created by bobin on 9/10/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoodBarService {

  private moodBarApi = 'https://moodeapp.in/app/getWebMoode';

  constructor(private http: Http ) {
  }

  getMoodBarData( moodBarRequestData: { } ) {
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    return this.http.post ( this.moodBarApi , moodBarRequestData , options )
      .map((res: Response) => res.json())
  }
}

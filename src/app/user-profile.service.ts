/**
 * Created by bobin on 26/10/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class UserProfileService{
  private userProfileApi = "https://moodeapp.in/app/visitProfileOnWeb";

  constructor(private http:Http){}

  getUserProfileData(userProfileRequestData:any){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.userProfileApi, userProfileRequestData, options)
      .map((res: Response) => res.json())
  }
}

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  private loginApi = "https://moodeapp.in/app/social/signUp";

  constructor(private http: Http){}

  getLoginData(loginRequestData:any){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.loginApi, loginRequestData, options)
      .map((res: Response) => res.json())
  }
}

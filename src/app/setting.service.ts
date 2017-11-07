/**
 * Created by bobin on 27/10/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
//import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class SettingService {
  private settingApi = "https://moodeapp.in/app/getSetting";

  constructor(private http:Http,){}

 /* createAuthorizationHeader(headers: Headers) {
    headers.append("access-control-allow-methods,access-control-allow-origin,content-type,signup,UserAuth");
  }*/

  getSettingData(settingRequestData:any){
    const header = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    let count = Object.keys(settingRequestData).length;
    console.log(count);
    //header['Content-Length'] = count.toString();
    header['UserAuth'] =(settingRequestData.imei + settingRequestData.sessionID);
    let headers =  new Headers(header);
    console.log("headers", headers, header, settingRequestData);

    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.settingApi, settingRequestData , options)
      .map((res: Response) => res.json())
  }
}


//return this.http.get(this.heroesUrl, headerObj)
/*
get(url) {
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  return this.http.get(url, {
    headers: headers
  });
}

post(url, data) {
  let headers = new Headers();
  this.createAuthorizationHeader(headers);
  return this.http.post(url, data, {
    headers: headers
  });
}*/

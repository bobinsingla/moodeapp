/**
 * Created by bobin on 12/10/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class PostDetailService {
  postDetailApi = "https://moodeapp.in/app/postDetailByWeb";

  constructor(private http:Http){

  }

  getPostDetailData(postDetailRequestData:any){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.postDetailApi, postDetailRequestData, options)
      .map((res: Response) => res.json())
  }
}

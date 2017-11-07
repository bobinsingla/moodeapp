/**
 * Created by bobin on 10/10/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomePostService {

  private homePostApi = 'https://moodeapp.in/app/userWebHome';
  private homePostLoginApi= 'https://moodeapp.in/app/userHomeV3_2';
  private moodHomePostApi = 'https://moodeapp.in/app/webExploreBySection';

  constructor ( private http: Http ) {
  }

  getHomePostData( homePostRequestData: { } ) {
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    return this.http.post ( this.homePostApi , homePostRequestData , options )
      .map((res: Response) => res.json())
  }
  getHomePostDataWithLogin(homePostRequestDataWithLogin: {}){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    return this.http.post ( this.homePostLoginApi , homePostRequestDataWithLogin , options )
      .map((res: Response) => res.json())
  }

  getMoodHomePostData(moodHomePostRequestData: {}){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: 'post' });
    return this.http.post ( this.moodHomePostApi , moodHomePostRequestData , options )
      .map((res: Response) => res.json())
  }
}


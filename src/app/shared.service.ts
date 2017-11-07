/**
 * Created by bobin on 24/10/17.
 */
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  sharedUser: {};

  private subject = new Subject<any>();
  private moodSubject = new Subject<any>();
  private moodChildSubject = new Subject<any>();
  private moodChildArraySubject = new Subject<any>();
  private homeSubject = new Subject<any>();
  private moodSelectedSub= new Subject<any>();

  shareUserData(loginResponseData: any){
    this.subject.next(loginResponseData);
  }

  shareMoodData(mood:any){
    this.moodSubject.next(mood);
  }
  shareMoodChildData(moodChild:any){
    this.moodChildSubject.next(moodChild);

  }
  shareMoodChildArray(moodChildArray:any){
    this.moodChildArraySubject.next(moodChildArray);
  }
  moodSelected(mood:boolean){
    this.moodSelectedSub.next(mood);
  }

  getMoodSelected(){
    return this.moodSelectedSub.asObservable();
  }

 //I guess this can be used for logout
  clearMessage() {
    this.subject.next();
  }

  goToHomeRequest(goToHome: boolean){
    this.homeSubject.next(goToHome);
  }

  goToHomeResponse(){
    return this.homeSubject.asObservable();
  }
  getUserData(): Observable<any> {
    return this.subject.asObservable();
  }

  getMoodData():Observable<any>{
    return this.moodSubject.asObservable();
  }

  getMoodChildData():Observable<any>{
    return this.moodChildSubject.asObservable();
  }

  getMoodChildArrayData():Observable<any>{
    console.log("i am in shared service for moodChildArraySubject", this.moodChildArraySubject.asObservable());
    return this.moodChildArraySubject.asObservable();
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service'
import { Subscription } from 'rxjs/Subscription';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { CommonSharedService } from './common-shared.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Component ({
  selector: 'header',
  templateUrl: 'app/header.component.html',
})

export class HeaderComponent {
  loggedIn:boolean = false;
  loggingIn:boolean = false;
  userSignUpResponseData:any;
  userName:string = "";
  subscription: Subscription;

  constructor(private router:Router, private sharedService: SharedService, private http:Http, private commonSharedService:CommonSharedService ){
    let currentUser, token;
    this.subscription = this.sharedService.getUserData()
      .subscribe(userDetails => {
        this.userSignUpResponseData = userDetails
      });

    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log("token",currentUser);
    if(currentUser){
      token = currentUser.token;
      this.checkLoginStatus(token)
    }
  }

  isLoggingIn(loggedIn: boolean, loggingIn:boolean){
    console.log(loggedIn);
    this.loggedIn = loggedIn;
    this.loggingIn = loggingIn;
    //this.sharedService.shareUserData(this.userSignUpResponseData);
    this.userSignUpResponseHandler();
  }

  checkLoginStatus(token: string){
    let sessionApi = "https://moodeapp.in/app/session";
    let sessionRequestData = {
      "careerName":"web",
      "deviceName":"browser",
      "platform":"browser",
      "time":"2017-9-26 13:2:23",
    };
    sessionRequestData['sessionID'] = token;
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(sessionApi, sessionRequestData, options)
      .map((res: Response) => res.json())
      .subscribe((userDetails) => {
        console.log("userDetails from session", userDetails);
        this.userSignUpResponseData = userDetails.session;
        this.loggedIn = true;
        this.loggingIn = false;
        this.userSignUpResponseHandler()
      })
  }

  userSignUpResponseHandler(){
    this.userName = this.userSignUpResponseData.firstName +' '+ this.userSignUpResponseData.lastName;
  }


  getUserProfilePic(){
    let myPicture;
    if(this.userSignUpResponseData.myPicture){
      myPicture = this.commonSharedService.getCloudinaryImageUrl(this.userSignUpResponseData.myPicture);
    }else{
      myPicture = 'resources/icons/user_profile_2.png'
    }
    return myPicture;
  }

  goToUserProfile(){
    let userProfileKey = this.userSignUpResponseData.userProfileKey;
    this.sharedService.shareUserData(this.userSignUpResponseData);
    this.sharedService.moodSelected(false);
    this.router.navigate(['/userprofile', userProfileKey])
  }

  logout(){
    this.sharedService.shareUserData('');
    localStorage.removeItem('currentUser')
  }
}

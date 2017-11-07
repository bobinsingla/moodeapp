import { Component,Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef, Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Login } from './login';
import { LoginService } from './login.service'
import { SharedService } from './shared.service';

declare var window: any;
declare var FB: any;
declare const gapi: any;

@Component ({
  selector: 'login-app',
  templateUrl: 'app/login.component.html',
  providers: [LoginService]
})

@Injectable()
export class LoginComponent{
  loggedIn:boolean = false;
  loggingIn:boolean = false;
  loginResponseData:any;
  sessionID:string = '';

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor(private loginService: LoginService, private sharedService: SharedService){

  }

  getLoginData(){
    let loginRequestData = {
      "careerName":"web",
      "dateOfBirth":"",
      "deviceName":"browser",
      "emailId":"bobinsingla30@gmail.com",
      "firstName":"Bobin",
      "gender":"none",
      "imei":"1071216312982030",
      "lastName":"Singla",
      "mobileNo":"",
      "password":"",
      "platform":"browser",
      "signUpFrom":"Google",
      "time":"2017-9-7 15:22:18",
      "timeZone":"Asia/Calcutta",
    };
    let time = new Date();
    loginRequestData['time'] = time.toLocaleString();
    this.loginService.getLoginData(loginRequestData)
    .subscribe((loginResponseData) => {
      this.loginResponseHandler(loginResponseData);
    })
  }

  loginResponseHandler(loginResponseData:any){
    this.sessionID = loginResponseData.socialSignUp.sessionID;
    localStorage.setItem('currentUser', JSON.stringify({ token: this.sessionID}));
    this.sharedService.shareUserData(loginResponseData.socialSignUp);
    this.loginResponseData = loginResponseData;
    console.log(this.loginResponseData);
    this.loggedIn = true;
    this.loggingIn = false;
    this.change.emit([this.loggedIn, this.loggingIn]);
    //this.loginResponse()
  }

 /* loginResponse(){
    console.log(this.loginResponseData);
    this.loginResponseData;
  }*/

  me(userId:any, accessToken:any){
  FB.api(
    "/" + userId + '?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
    (result:any) => {
      console.log("result===", result);
      if (result && !result.error) {
      }
    })
  }

  fbLogin(){
    FB.init({
      appId: '1896888180576849',
      cookie: false,  // enable cookies to allow the server to access
      // the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.10' // use graph api version 2.5
    });

    FB.login((response: any) => {
      if (response.status === 'connected') {
        this.me(response.authResponse.userID, response.authResponse.accessToken);
        // Logged into your app and Facebook.
      } else if (response.status === 'not_authorized') {
        console.log('not_authorized')
        // The person is logged into Facebook, but not your app.
      } else {
        console.log("nothing from fb")
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
      }
    }, {scope: 'public_profile,email'});
  }

  googleLogin(){
    this.getLoginData()
  }
}

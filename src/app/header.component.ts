import { Component } from '@angular/core';
import { Login } from './login';

@Component ({
  selector: 'header',
  templateUrl: 'app/header.component.html',
  providers:[Login]
})

export class HeaderComponent {
  loggedIn:boolean = false;
  loggingIn:boolean = false;
  userSignUpResponseData:any;
  firstName:string = "";

  constructor(private login:Login){
}

  isLoggingIn(value: boolean, value2:boolean, value3:any){
    console.log(value);
    this.loggedIn = value;
    this.loggingIn = value2;

    if(value3){
      this.userSignUpResponseHandler(value3.socialSignUp);
    }
  }

  userSignUpResponseHandler(value3:Login){
    console.log(this.login);
    this.userSignUpResponseData = value3;
    this.firstName = value3.firstName;
  }
}

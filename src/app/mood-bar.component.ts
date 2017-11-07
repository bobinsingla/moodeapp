/**
 * Created by bobin on 9/10/17.
 */
import { Component, Input } from '@angular/core';
import { MoodBarService } from './mood-bar.service';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'mood-bar',
  templateUrl: 'app/mood-bar.component.html',
  providers: [ MoodBarService ]
})

export class MoodBarComponent{
  @Input() userSignUpResponseData:any;
  //userSignUpResponseData: any;
  moodBarObj = {};
  moodBarArray: Array <any>= [];
  moodBarChildrenArray: Array<any> = [];
  moodSelected:boolean = false;
  moodDetails:string;
  subscription:Subscription;

  constructor(
    private moodBarService: MoodBarService,
    private sharedService: SharedService,
    private router :Router
  ){
    this.getMoodBarData();
    this.subscription = this.sharedService.getMoodSelected()
      .subscribe((moodSelected) => {
        this.moodSelected = moodSelected
      });
  }

  getMoodBarData(){
    let moodBarRequestData = {
      "careerName": "web",
      "deviceName": "browser",
      "platform": "browser",
      "time": "2017-6-17 14:8:37",
      "timeZone": "Asia/Calcutta"
    };

    let time = new Date();
    moodBarRequestData['time'] = time.toLocaleString();

    this.moodBarService.getMoodBarData(moodBarRequestData)
      .subscribe(moodBarResponseData => {
      console.log(moodBarResponseData);
      this.moodBarResponseHandler(moodBarResponseData)
    })
  }


  moodBarResponseHandler(moodBarResponseData:any){
    let newObj = moodBarResponseData.getWebMoode.cotegory;
    this.moodBarObj = moodBarResponseData.getWebMoode.cotegory;
    this.moodBarArray = Object.keys(newObj);
  }


  getMoodImage(mood:any){
    let moodImage = this.moodBarObj[mood][0].iconImageUrl;
    moodImage = moodImage.replace("size", "100");
    return moodImage;
  }


  getMoodBarChildren(mood:any){
    this.moodSelected = true;
    this.moodBarChildrenArray = [];
    let moodBarChild;
    for(let i= 0; i < this.moodBarObj[mood].length; i++){
      moodBarChild = this.moodBarObj[mood][i];
      this.moodBarChildrenArray.push(moodBarChild);
    }
    console.log("moodChildArray", this.moodBarChildrenArray);
    this.moodDetails = mood;
    //this.sharedService.shareMoodData(mood);
    this.sharedService.shareMoodChildArray(this.moodBarChildrenArray);
  }


  getMoodBarChildImage(moodChild:any){
    let moodChildImage = moodChild.dishImageUrl.replace("size", "100");
    return moodChildImage;
  }


  getUserProfilePic(){
    let myPicture;
    if(this.userSignUpResponseData.myPicture){
      myPicture = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + this.userSignUpResponseData.myPicture;
    }else{
      myPicture = 'resources/icons/user_profile_2.png'
    }
    return myPicture;
  }


  moodBarChildHandler(moodBarChild: any){
    this.router.navigate([this.moodDetails , moodBarChild.tagsName ])
    //this.router.navigate(['', moodBarChild])
  }


  goToHome(){
    this.moodSelected = false;
    //this.sharedService.shareUserData(this.userSignUpResponseData.socialSignUp);
    this.router.navigate(['']);
  }


  goToMood(mood:string){
    this.router.navigate(['', mood]);
    this.getMoodBarChildren(mood);
  }


  goToWorld(){
    this.sharedService.moodSelected(false);
    this.router.navigate(['/world']);
  }


  goToShop(){
    this.sharedService.moodSelected(false);
    this.router.navigate(['/shop']);
  }
}

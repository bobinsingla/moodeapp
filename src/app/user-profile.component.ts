/**
 * Created by bobin on 26/10/17.
 */
import { Component } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from './shared.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'userprofile',
  templateUrl: 'app/user-profile.component.html',
  providers:[ UserProfileService ]
})

export class UserProfileComponent{

  userProfileKey:string;
  userProfileResponseData:any;
  userData: any;
  worldContentArray:any;
  bookImage:string = 'resources/background/storyboard_book_cover.png';
  subscription:Subscription;
  userDetails:any;
  viewSetting:boolean = false;
  userProfileView:boolean = true;

  constructor(
    private userProfileService: UserProfileService,
    private route:ActivatedRoute,
    private router:Router,
    private sharedService: SharedService
  ){
    /*this.subscription = this.sharedService.getUserData()
      .subscribe(userDetails => {
        this.userDetails = userDetails;
        console.log("userDetails in userProfile", this.userDetails);
      });*/
    this.route.params
      .subscribe(params => {
        this.userProfileKey = params['id'];
        if (this.userProfileKey) {
          this.getUserProfileData(this.userProfileKey);
        }
      });
  }


  ngOnInit() {

  }


  getUserProfileData(userProfileKey:string){
    let userProfileRequestData = {
      "careerName":"web",
      "deviceName":"browser",
      "platform":"browser",
      "time":"2017-9-26 13:2:23",
      "timeZone":"Asia/Calcutta",
    };
    userProfileRequestData["userProfileKey"] = userProfileKey;
    this.userProfileService.getUserProfileData(userProfileRequestData)
      .subscribe(userProfileResponseData => {
        console.log("userProfileResponseData", userProfileResponseData);
        this.userProfileResponseHandler(userProfileResponseData)
      })
  }

  userProfileResponseHandler(userProfileResponseData:any){
    this.userProfileResponseData = userProfileResponseData;
    this.userData = userProfileResponseData.visitProfile.userProfile;
    this.worldContentArray= this.userData.exploreUsersBooks
  }

  getUserProfilePic(){
    return 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + this.userData.profilePic
  }

  getBookCoverImage(worldContent:any, index:number){
    if(worldContent.userBook.bookImage){
      return 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldContent.userBook.bookImage
    }else{
      return 'resources/background/placeholder_2.jpg'
    }
  }

  goToWorldPage(worldContent:any){
    let storyBoardKey = worldContent.userBook.storyBoardKey;
    this.router.navigate(['/world', storyBoardKey])
  }

  goToSetting(){
    this.viewSetting = true;
    this.userProfileView =false;
/*
    console.log("userToGoToSetting", this.userDetails);
*/
    //this.sharedService.shareUserData(this.userDetails);
    //this.router.navigate(['/setting'])
  }
}

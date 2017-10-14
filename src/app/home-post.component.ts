/**
 * Created by bobin on 10/10/17.
 */
import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Login } from './login';
import { HomePostService } from './home-post.service';
import { AppResources } from './app-resources-management';

@Component({
  selector: 'home-post',
  templateUrl: 'app/home-post.component.html',
  styleUrls: [ 'app/home-post.component.css' ],
  providers: [ HomePostService, Login ]
})

export class HomePostComponent implements OnInit{
  myOptions = {
    transitionDuration: '0.8s'
  };
  homePostArray:Array<any> = [];
  youtubePlayerURL:any;
  showYoutubePlayer:boolean;
  pageId:number = 1;


  constructor(
    private homePostService: HomePostService,
    private sanitizer: DomSanitizer,
    private login: Login,
    private router:Router,
    private ref:ChangeDetectorRef
  ){}

  ngOnInit(){
    this.getHomePostData(this.pageId);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if((document.documentElement.scrollTop + document.documentElement.clientHeight) == (document.documentElement.scrollHeight) ) {
      if(this.homePostArray !=null && this.homePostArray[this.homePostArray.length-1]!=null)
      {
        if(this.pageId <= 4){
          this.pageId++;
          this.getHomePostData(this.pageId);
        }
      }
    }
  }

  getHomePostData(pageId: number){
    let homePostRequestData = {
      "mode": "DESC",
      "type": "userhome",
      "pageID": 1,
      "careerName": "web",
      "deviceName": "browser",
      "platform": "browser",
      "imei": "105473668152346936259",
      "time": "2017-6-19 15:21:46",
      "timeZone": "Asia/Calcutta",
      "location": {   "latitude": "28.5006195",   "longitude": "77.073771" }
    };
    homePostRequestData["pageID"] = pageId;
    this.homePostService.getHomePostData(homePostRequestData)
      .subscribe((homePostResponseData) => {
        console.log("homePostResponseData:", homePostResponseData);
        this.homePostResponseHandler(homePostResponseData)
      })
  }

  homePostResponseHandler(homePostResponseData:any):void{
    let newObj  = homePostResponseData.userWebHome;
    for (let i = 0; i < newObj.postData.length; ++i) {
      this.homePostArray.push(newObj.postData[i]);
    }
    console.log("postArray",this.homePostArray);
  }

  checkPostHeight(post:any):number{
    let height = 250;
    if(post.postCover != null && post.postCover.length > 0 ){
      if(post.postCover[0].imageHeight != null && post.postCover[0].imageWidth != null){
        if(document.documentElement.clientWidth > 700){
          height = (post.postCover[0].imageHeight * (document.documentElement.clientWidth / 5))/post.postCover[0].imageWidth;
        }else{
          height = (post.postCover[0].imageHeight * (document.documentElement.clientWidth))/post.postCover[0].imageWidth;
        }
      }
    }
    return height;
  }

  getHomePostImageUrl( post:any, index:number):string{
    let url;
    if(post.postCover != null && post.postCover.length != 0 && post.postCover[0].url){
      if(post.postCover[0].url.indexOf("http")==-1){
        url = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + post.postCover[0].url
      }else{
        url = post.postCover[0].url;
      }
    }else{
      url ='app/resources/background/placeholder_1.jpg';
      let imageNum=index;
      imageNum = Math.floor(imageNum%9);
      switch(imageNum){
        case 0:
          url='resources/background/placeholder_1.jpg';
          break;
        case 1:
          url='resources/background/placeholder_2.jpg';
          break;
        case 2:
          url='resources/background/placeholder_3.jpg';
          break;
        case 3:
          url='resources/background/placeholder_4.jpg';
          break;
        case 4:
          url='resources/background/placeholder_5.jpg';
          break;
        case 5:
          url='resources/background/placeholder_6.jpg';
          break;
        case 6:
          url='resources/background/placeholder_7.jpg';
          break;
        case 7:
          url='resources/background/placeholder_8.jpg';
          break;
        case 8:
          url='resources/background/placeholder_9.jpg';
          break;
      }
    }
    return url;
  }

  getUserProfileImage( post: any, index: number) {
    let profilePic = '';
    if ( post.profilePicUrl ) {
      profilePic = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + post.profilePicUrl

    }
    else{
      //AppResources.getUserProfilePic(index)
      profilePic='app/resources/icons/user_profile_1.png';
      let imageNum= index;
      imageNum = Math.floor(imageNum%6);
      switch(imageNum){
        case 0:
          profilePic='resources/icons/user_profile_1.png';
          break;
        case 1:
          profilePic='resources/icons/user_profile_2.png';
          break;
        case 2:
          profilePic='resources/icons/user_profile_3.png';
          break;
        case 3:
          profilePic='resources/icons/user_profile_4.png';
          break;
        case 4:
          profilePic='resources/icons/user_profile_5.png';
          break;
        case 5:
          profilePic='resources/icons/user_profile_6.png';
          break;
      }
    }
    return profilePic;
  }

  isPostVideo(post:any):boolean{
    let result = false;
    if(post.postCover!=null && post.postCover.length > 0 ){
        if(post.postCover[0].type == 1){
          result = true
        }
      }
    return result;
  }

  playVideo(post:any){
    this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+post.postCover[0].videoId);
    this.showYoutubePlayer = true;
  }

  closeVideo(){
    this.showYoutubePlayer=false;
  }
  loadMore(){
    console.log("getHomePostLogin", this.login.firstName);
    this.pageId++;
    this.getHomePostData(this.pageId);
  }

  goToDetail(post:any){
    this.router.navigate(['/story', post.postKey])
  }
}

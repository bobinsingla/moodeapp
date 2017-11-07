/**
 * Created by bobin on 10/10/17.
 */
import { Component, HostListener, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { HomePostService } from './home-post.service';
import { SharedService } from './shared.service';
import { CommonSharedService } from './common-shared.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';



@Component({
  selector: 'home-post',
  templateUrl: 'app/home-post.component.html',
  styleUrls: [ 'app/home-post.component.css' ],
  providers: [ HomePostService ]
})

export class HomePostComponent implements OnInit{
  myOptions = {
    transitionDuration: '0.8s'
  };
  homePostArray:Array<any>= [];
  youtubePlayerURL:any;
  showYoutubePlayer:boolean;
  pageId:number = 1;
  userDetails:any;
  sessionID:any;
  isMoodSelected: boolean = false;
  moodDetails:any;
  moodChildTagsID:any="";
  moodSelected:boolean = false;
  moodBarChildrenArray: Array<any>=[];
  subscription: Subscription;
  loggedIn:boolean = false;
  moodChildName:string;
  moodChildDetails:any;

  constructor(
    private homePostService: HomePostService,
    private sanitizer: DomSanitizer,
    private router:Router,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private commonSharedService:CommonSharedService

  ){
    /*let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token;
    if(token){
      this.userDetailsResponseHandler(token);
    }*/

    /*let userDetailsSubscription = this.sharedService.getUserData();
    let checkRouteParams = this.route.params;
    Observable.forkJoin([userDetailsSubscription, checkRouteParams]).subscribe(results => {
      console.log('this fork join thing is working');
      console.log(results);
    });*/
    this.subscription = this.sharedService.getUserData()
      .subscribe(userDetails => {
        console.log("Message from home post component", userDetails);
        if(userDetails != null){
          this.loggedIn = true;
          this.userDetails = userDetails;
          this.sessionID = userDetails.sessionID;
          this.selectContent();
        }
      });

    this.route.params.subscribe(params => {
      console.log("checking out route params", params['id'], params['id2']);
      this.moodDetails = params['id'];
      this.moodChildName = params['id2'];
      this.selectContent();
    });

    /*this.subscription = this.sharedService.getMoodChildArrayData()
      .subscribe(moodChildArray => {
        this.moodSelected = true;
        console.log('mood children found', moodChildArray );
        this.moodBarChildrenArray = moodChildArray;
      });*/
  }

  ngOnInit(){
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

  selectContent(){
    if(this.moodDetails){
      console.log('I will display data if mood is selected');
      this.moodSelected = true;
      this.moodHandler();
    }else{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(currentUser){
        this.sessionID = currentUser.token;
        console.log("I will display data if mood is not selected but person is logged in");
        this.userDetailsResponseHandler(this.sessionID);
      }else{
        console.log('I will display data if mood is not selected and person is not logged in');
        this.getHomePostData(this.pageId);
      }
      /*if(this.loggedIn){
        console.log("I will display data if mood is not selected but person is logged in");
        this.userDetailsResponseHandler(this.userDetails);
      }*/
    }
    /*this.subscription = this.sharedService.getMoodData()
      .subscribe(moodDetails => {
        console.log("mood details", moodDetails);
        this.moodHandler(moodDetails);
      });

    this.subscription = this.sharedService.goToHomeResponse()
      .subscribe((goToHome) => {
        if(goToHome == true){
          this.homePostArray = [];
          this.moodSelected = false;
          this.pageId = 1;
          this.getHomePostDataWithLogin(this.pageId)
        }
      })*/
  }
  userDetailsResponseHandler(sessionID: any){
    console.log("sessionID",sessionID);
    this.homePostArray = [];
    this.isMoodSelected = false;
    this.moodSelected = false;
    this.pageId = 1;
    this.getHomePostData(this.pageId);
  }

  moodHandler(){
    this.homePostArray = [];
    this.isMoodSelected = true;
    this.pageId = 1;
    this.moodChildTagsID = "";
    this.getHomePostData(this.pageId);
  }

  /*moodBarChildHandler(moodChildDetails: any){
    this.router.navigate([this.moodDetails , moodChildDetails.tagsName ])
   /!* this.homePostArray = [];
    this.pageId = 1;
    this.moodChildTagsID = moodChildDetails.tagsID;
    console.log(this.moodChildTagsID);
    this.getHomePostData(this.pageId);*!/
  }
*/
  getHomePostData(pageId: number){
    if(this.isMoodSelected == true){
      this.getMoodPostData(pageId)
    }else{
      if(this.sessionID != null){
        this.getHomePostDataWithLogin(pageId)
      }else{
        this.getHomePostDataWithoutLogin(pageId)
      }
    }
  }


  getMoodPostData(pageId: number){
    let moodHomePostRequestData = {
      "careerName":"web",
      "deviceName":"browser",
      "loadSection":0,
      "location":{"latitude": "28.5006195", "longitude": "77.073771"},
      "mode":"ASC",
      "pageID":1,
      "platform":"browser",
      "sortBy":"newest",
      "tagID":"",
      "timeZone":"Asia/Calcutta",
      "title":"LOVE",
      "userType":"",
    };
    let time = new Date();
    moodHomePostRequestData["time"] = time.toLocaleString();
    moodHomePostRequestData["pageID"] = pageId;
    //this.moodDetails.toString();
    console.log(this.moodDetails);
    moodHomePostRequestData["title"] = this.moodDetails;
    if(this.moodChildName ){
      this.moodChildName.toString();
      console.log(this.moodChildName);
      moodHomePostRequestData["tagName"] = this.moodChildName;
    }
    console.log(moodHomePostRequestData);
    this.homePostService.getMoodHomePostData(moodHomePostRequestData)
      .subscribe((moodHomePostResponseData) => {
          console.log("moodHomePostResponseData:", moodHomePostResponseData);
          this.homePostResponseHandler(moodHomePostResponseData.webExploreBySection)
      })
  }

  getHomePostDataWithLogin(pageId: number){
    let homePostRequestDataWithLogin= {
      "mode": "DESC",
      "type": "userhome",
      "careerName": "web",
      "deviceName": "browser",
      "platform": "browser",
      "imei": "105473668152346936259",
      "timeZone": "Asia/Calcutta",
      "location": { "latitude": "28.5006195", "longitude": "77.073771"}
    };
    let time = new Date();
    homePostRequestDataWithLogin['time'] = time.toLocaleString();
    homePostRequestDataWithLogin["pageID"] = pageId;
    homePostRequestDataWithLogin["sessionID"] = this.sessionID;
    this.homePostService.getHomePostDataWithLogin(homePostRequestDataWithLogin)
      .subscribe((homePostResponseDataWithLogin) => {
        console.log("homePostRequestDataWithLogin:", homePostResponseDataWithLogin);
        this.homePostResponseHandler(homePostResponseDataWithLogin.userHomeV3_2)
      });
  }

  getHomePostDataWithoutLogin(pageId: number){
    let homePostRequestData = {
      "mode": "DESC",
      "type": "userhome",
      "careerName": "web",
      "deviceName": "browser",
      "platform": "browser",
      "imei": "105473668152346936259",
      "timeZone": "Asia/Calcutta",
      "location": {   "latitude": "28.5006195",   "longitude": "77.073771" }
    };
    let time = new Date();
    homePostRequestData['time'] = time.toLocaleString();
    homePostRequestData["pageID"] = pageId;
    this.homePostService.getHomePostData(homePostRequestData)
      .subscribe((homePostResponseData) => {
        console.log("homePostResponseData:", homePostResponseData.userWebHome);
        this.homePostResponseHandler(homePostResponseData.userWebHome)
      });
  }


  homePostResponseHandler(homePostResponseData:any):void{
    let newObj  = homePostResponseData;
    for (let i = 0; i < newObj.postData.length; ++i) {
      this.homePostArray.push(newObj.postData[i]);
    }
    console.log("postArray",this.homePostArray);
  }

  getMoodBarChildImage(moodChild:any){
    let moodChildImage = moodChild.dishImageUrl.replace("size", "100");
    return moodChildImage;
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
         url =  this.commonSharedService.getCloudinaryImageUrl(post.postCover[0].url);
      }else{
        url = post.postCover[0].url;
      }
    }else{
      url = this.commonSharedService.getPlaceholder(index);
    }
    return url;
  }

  getUserProfileImage( post: any, index: number) {
    let profilePic = '';
    if ( post.profilePicUrl ) {
      profilePic = this.commonSharedService.getCloudinaryImageUrl(post.profilePicUrl)
    }
    else{
      profilePic = this.commonSharedService.getUserProfilePic(index);
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
    this.pageId++;
    this.getHomePostData(this.pageId);
  }

  goToDetail(post:any){
    this.sharedService.moodSelected(false);
    this.router.navigate(['/story', post.postKey])
  }
}

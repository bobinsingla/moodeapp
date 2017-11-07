import { Component, HostListener } from '@angular/core';
import { WorldService } from './world.service';
import { MasonryModule } from 'angular2-masonry';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
	selector: 'my-world',
	templateUrl: 'app/world.component.html',
	styleUrls:['app/world.component.css'],
	providers : [ WorldService ]
})

export class WorldComponent{
	myOptions = {
      transitionDuration: '0.8s'
    };
	name = "World";
	worldContentArray:Array<any> = [];
	worldResponseData: any;
	pageId: number = 1;
	isPublisher:number = 2;
	worldContent:any;
	isActive:boolean = true;
	bookImage:string = "resources/background/storyboard_book_cover.png";
  backgroundCss1:string;
  backgroundCss2:string;
  backgroundCss3:string;
  backgroundCss0:string;


	constructor(private worldService: WorldService,private http: Http, private router: Router,){
		this.getData(this.pageId, this.isPublisher);
    this.getRoleCss(this.isPublisher);
	}

	@HostListener("window:scroll", [])
    onWindowScroll() {
       if(document.documentElement.scrollTop + document.documentElement.clientHeight== document.documentElement.scrollHeight) {
           if(this.worldContentArray !=null && this.worldContentArray[this.worldContentArray.length-1]!=null)
           {
            this.pageId++;
            this.getData(this.pageId, this.isPublisher);
          }

       }
    }

  getRole(id:number, isPublisher:number){
    this.isActive = true;
    this.isPublisher = isPublisher;
    this.worldContentArray = [];
    this.getData(id, isPublisher);
    this.getRoleCss(isPublisher)
  }

  getRoleCss(value:number){
    switch(value){
      case 0:
        this.backgroundCss0='headerBackground';
        this.backgroundCss1= 'publishers';
        this.backgroundCss2= 'publishers';
        this.backgroundCss3= 'publishers';
        break;
      case 1:
        this.backgroundCss1='headerBackground';
        this.backgroundCss0= 'publishers';
        this.backgroundCss2= 'publishers';
        this.backgroundCss3= 'publishers';
        break;
      case 2:
        this.backgroundCss2='headerBackground';
        this.backgroundCss1= 'publishers';
        this.backgroundCss0= 'publishers';
        this.backgroundCss3= 'publishers';
        break;
      case 3:
        this.backgroundCss3='headerBackground';
        this.backgroundCss1= 'publishers';
        this.backgroundCss2= 'publishers';
        this.backgroundCss0= 'publishers';
        break;
    }
  }

	getData(id:number, isPublisher:number){
		const worldRequestData = {
			"careerName":"web",
			"deviceName":"browser",
			"imei":"1071216312982030",
			"isPublisher":2,
			"pageID":1,
			"platform":"browser",
			"sessionID":"OjNmTwLRrSpVtuWy",
			"time":"2017-8-18 13:21:54",
			"timeZone":"Asia/Calcutta",
		};
		if(id){
			worldRequestData["pageID"] = id
		}
		worldRequestData["isPublisher"] = isPublisher;

		const worldRequestDataJson = JSON.stringify(worldRequestData);

		this.worldService.getData(worldRequestDataJson).subscribe(worldResponseData => {
    		console.log("worldResponseData", worldResponseData);
    		this.worldResponseHandler(worldResponseData);
    	})
	}


	worldResponseHandler(worldResponseData:any){
		let newObj  = worldResponseData.exploreUsersBook;
	    for (let i = 0; i < newObj.exploreUsersBooks.length; ++i) {
	       	this.worldContentArray.push(newObj.exploreUsersBooks[i]);
	    }
	}


	getWorldImageUrl(worldContent: any){
		let worldImage = 'app/color.png';
		if(worldContent.album[0] != null && worldContent.album[0].length != 0){
			worldImage = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldContent.album[0]
		}
		return worldImage
	}

	getWorldDetail(worldContent:any){
		this.worldContent = worldContent;
		this.router.navigate(['/world', this.worldContent.userBook.storyBoardKey])
	}
	getBackgroundImage(){
		let imageUrl ;
		return imageUrl = "resources/icons/world_canopy.png"
	}
	getUserProfileImage(worldContent:any, index:number){
		let profilePic = "";
		if(worldContent.userBook.profilePic){
			profilePic = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldContent.userBook.profilePic
		}
		else{
			profilePic='resources/icons/user_profile_1.png';
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
}


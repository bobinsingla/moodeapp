import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WorldDetailService } from './world-detail.service';
import { DOCUMENT,Title,DomSanitizer } from '@angular/platform-browser';

import 'rxjs/add/operator/map';



@Component({
  selector: 'my-world-detail',
  templateUrl: 'app/world-detail.component.html',
  providers: [WorldDetailService]
})

export class WorldDetailComponent  {
	myOptions = {
      transitionDuration: '0.8s'
    };
    youtubePlayerURL: any;
	showYoutubePlayer: any;
	worldResponseData: any;
	worldDetailArray:Array<any> = [];
	userProfilePic:string;

	constructor( private route: ActivatedRoute,
		private worldDetailService: WorldDetailService,
		private router: Router,
		private sanitizer: DomSanitizer) {}


  ngOnInit() {
    console.log("ngOninit");
      this.route.params.map(param=> param['id']).subscribe((id)=>{
        if(id!=null && id!="")
        {
          this.requestData(id);
        }
    });
  }

	requestData(storyBoardKey: any) {
		const worldRequestData = {
      "careerName":"web",
      "deviceName":"browser",
			"platform":	"browser",
			"storyBoardKey":"Love-and-Olive-Oil-Storyboard--5484",
			"time":"2017-8-18 19:58:4",
			"timeZone":"Asia/Calcutta",
    };

    worldRequestData['storyBoardKey'] = storyBoardKey;
    const worldRequestDataJson = JSON.stringify(worldRequestData);

		this.worldDetailService.getData(worldRequestDataJson)
			.subscribe((worldResponseData) => {
				this.worldDetailResponseHandler(worldResponseData)
			});
	}

	worldDetailResponseHandler(worldResponseData: any){
		console.log("worldResponseData:", worldResponseData);
		let newObj  = worldResponseData.userBookScreening;
		this.worldResponseData = newObj
	    /*for (var i = 0; i < newObj.postData.length; ++i) {
	       	this.worldDetailArray.push(newObj.postData[i]);
	    }*/
	}

	getPostUrl(worldImage:any):string{
    let url:string = "app/color.png";
    if(typeof(worldImage) === "string" ){
      url = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldImage
    }else if(typeof(worldImage) === "object"){
      if(worldImage.postCover && worldImage.postCover.length){
        if(worldImage.postCover[0].url.indexOf("http")==-1){
          url = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldImage.postCover[0].url
        }else{
          url = worldImage.postCover[0].url;
        }
      }
    }
    return url;
	}

	isPostVideo(post:any):boolean{
		let result = false;
		if(post.postCover!=null){
      if(post.postCover!=null){
        if(post.postCover[0]!=null && post.postCover[0].type == 1){
          result = true
        }
      }
    }
    return result;
	}


	playVideo(post:any){
		console.log("Playing");
		this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+post.postCover[0].videoId);
    this.showYoutubePlayer = true;
	}


	closeVideo(){
		this.showYoutubePlayer=false;
	}

	goToDetail(worldDetail:any){
		this.router.navigate(['/story', worldDetail.postKey])
	}


	getUserProfileImage(worldDetail:any, index:number){
		let profilePic = "";
		if(worldDetail.profilePicUrl){
			profilePic = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldDetail.profilePicUrl;
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
		this.userProfilePic = profilePic;
		return profilePic;
	}

	getUserProfile(worldDetail: any){
		let userProfile ;
		if(worldDetail.userProfilePic){
			userProfile = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + worldDetail.userProfilePic
		}else{
			userProfile = 'resources/icons/user_profile_6.png';
		}
		return userProfile;
	}

}


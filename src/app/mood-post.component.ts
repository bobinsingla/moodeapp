/**
 * Created by bobin on 31/10/17.
 */
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomePostService } from './home-post.service';


@Component({
  selector: 'mood-post',
  templateUrl: 'app/mood-post.component.html',
  providers: [ HomePostService ]
})

export class MoodPostComponent {

  moodPostArray:Array<any> = [];
  pageId:number = 1;
  title:string = "";
  moodChildTagsID:string= "";

  constructor(
    private route:ActivatedRoute,
    private homePostService: HomePostService
  ){}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if((document.documentElement.scrollTop + document.documentElement.clientHeight) == (document.documentElement.scrollHeight) ) {
      if(this.moodPostArray !=null && this.moodPostArray[this.moodPostArray.length-1]!=null)
      {
        if(this.pageId <= 4){
          this.pageId++;
          this.getMoodPostData(this.pageId, this.title);
        }
      }
    }
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.title = params['id'];
      this.moodChildTagsID = params['id2'];
    });
    if (this.title) {
      this.getMoodPostData(this.pageId, this.title);
    }
  }

  getMoodPostData(pageId: number, title: string){
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
      "time":"2017-8-20 14:31:7",
      "timeZone":"Asia/Calcutta",
      "title":"LOVE",
      "userType":"",
    };
    moodHomePostRequestData["pageID"] = pageId;
    this.title.toString();
    console.log(this.title);
    moodHomePostRequestData["title"] = this.title;
    if(this.moodChildTagsID) {
      this.moodChildTagsID.toString();
      console.log(this.moodChildTagsID);
      moodHomePostRequestData["tagID"] = this.moodChildTagsID;
    }
    console.log(moodHomePostRequestData);
    this.homePostService.getMoodHomePostData(moodHomePostRequestData)
      .subscribe((moodHomePostResponseData) => {
        console.log("homePostResponseData:", moodHomePostResponseData);
        this.moodPostResponseHandler(moodHomePostResponseData.webExploreBySection)
      })
  }

  moodPostResponseHandler(homePostResponseData:any):void{
    let newObj  = homePostResponseData;
    for (let i = 0; i < newObj.postData.length; ++i) {
      this.moodPostArray.push(newObj.postData[i]);
    }
    console.log("postArray",this.moodPostArray);
  }
}

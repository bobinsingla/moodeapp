/**
 * Created by bobin on 9/10/17.
 */
import { Component, Input } from '@angular/core';
import { MoodBarService } from './mood-bar.service'
import 'rxjs/add/operator/map';

@Component({
  selector: 'mood-bar',
  templateUrl: 'app/mood-bar.component.html',
  providers: [ MoodBarService ]
})

export class MoodBarComponent {
  @Input() userSignUpResponseData:any;
  moodBarObj = {};
  moodBarArray: Array <any>= [];
  moodBarChildrenArray: Array<any> = [];
  moodSelected:boolean = false;

  constructor(private moodBarService: MoodBarService){
    this.getMoodBarData()
  }

  getMoodBarData(){
    let moodBarRequestData = {
      "careerName": "web",
      "deviceName": "browser",
      "platform": "browser",
      "time": "2017-6-17 14:8:37",
      "timeZone": "Asia/Calcutta"
    };

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
    console.log("moodChildArray", this.moodBarChildrenArray)
  }


  getMoodBarChildImage(moodChild:any){
    let moodChildImage = moodChild.dishImageUrl.replace("size", "100");
    return moodChildImage;
  }

}

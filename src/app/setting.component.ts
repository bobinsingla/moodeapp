/**
 * Created by bobin on 27/10/17.
 */
import { Component, Input  } from '@angular/core';
import { SettingService } from './setting.service'
import { SharedService } from './shared.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'setting',
  templateUrl: 'app/setting.component.html',
  providers: [ SettingService ]
})

export class SettingComponent {

  @Input() userDetails:any;
  subscription: Subscription;

  constructor(
    private settingService: SettingService,
    private sharedService: SharedService,
    private router: Router
  ){
    this.getSettingData();
    /*this.sharedService.getUserData()
      .subscribe(userDetails => {
        console.log("Message from god", userDetails);
        if(userDetails != null){
          this.userDetails = userDetails
        }
      });*/
  }

  getSettingData(){
    let settingRequestData = {
      "careerName":"web",
      "deviceName":"browser",
      "imei":"1071216312982030",
      "platform":"browser",
      "timeZone":"Asia/Calcutta",
    };
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token = currentUser.token;
    settingRequestData['sessionID'] = token;

    let time = new Date();
    settingRequestData['time'] = time.toLocaleString();

    console.log("Message from settings", settingRequestData);

    this.settingService.getSettingData(settingRequestData)
      .subscribe((settingResponseData) =>{
        console.log("settingResponseData", settingResponseData)
      })
  }

  logout(){
    localStorage.clear();
    location.reload();
    this.router.navigate([''])
  }
}

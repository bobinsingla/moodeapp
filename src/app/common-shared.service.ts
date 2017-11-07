/**
 * Created by bobin on 6/11/17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CommonSharedService {
  constructor(){}

  getCloudinaryImageUrl(imageToken:any){
    return 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + imageToken;
  }

  getUserProfilePic(index:number){
    let profilePic;
    let imageNum= index;
    imageNum = Math.floor(imageNum%6);
    switch(imageNum) {
      case 0:
        profilePic = 'resources/icons/user_profile_1.png';
        break;
      case 1:
        profilePic = 'resources/icons/user_profile_2.png';
        break;
      case 2:
        profilePic = 'resources/icons/user_profile_3.png';
        break;
      case 3:
        profilePic = 'resources/icons/user_profile_4.png';
        break;
      case 4:
        profilePic = 'resources/icons/user_profile_5.png';
        break;
      case 5:
        profilePic = 'resources/icons/user_profile_6.png';
        break;
    }
    return profilePic;
  }

  getPlaceholder(index:number){
   let  url ='app/resources/background/placeholder_1.jpg';
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
    return url
  }
}

/**
 * Created by bobin on 13/10/17.
 */
export class AppResources {

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
}

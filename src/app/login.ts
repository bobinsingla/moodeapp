export class Login {
  errorCode?:string ;
  firstLogin?: boolean;
  firstName: string = "name";
  gender: string;
  lastName: string;
  message?: string;
  myPicture: string;
  preferenceSet: boolean;
  preferences?: string;
  referralCode: string;
  sessionID: string;
  status: boolean;
  tags: Array<any>;
  userBook: Array<any>;
  userHandler: string;
  userName: string;
  userProfileKey: string;
  userUniqueId: string;
  videoID: string;
  videoPlay: number;

  constructor() {
  }
  loginData(socialSignUpResponseData:any){
    this.firstName = socialSignUpResponseData.firstName;
    this.gender = socialSignUpResponseData.Datagender;
    this.lastName = socialSignUpResponseData.lastName;
    this.myPicture = socialSignUpResponseData.myPicture;
    this.preferenceSet = socialSignUpResponseData.preferenceSet;
    this.referralCode = socialSignUpResponseData.referralCode;
    this.sessionID = socialSignUpResponseData.sessionID;
    this.status = socialSignUpResponseData.status;
    this.tags = socialSignUpResponseData.tags;
    this.userBook = socialSignUpResponseData.userBook;
    this.userHandler = socialSignUpResponseData.userHandler;
    this.userName = socialSignUpResponseData.userName;
    this.userProfileKey = socialSignUpResponseData.userProfileKey;
    this.userUniqueId = socialSignUpResponseData.userUniqueId;
    this.videoID = socialSignUpResponseData.videoID;
    this.videoPlay = socialSignUpResponseData.videoPlay;
  }
}

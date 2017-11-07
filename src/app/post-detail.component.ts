/**
 * Created by bobin on 12/10/17.
 */
import { Component, OnInit } from '@angular/core';
import { PostDetailService } from './post-detail.service'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'post-detail',
  templateUrl: 'app/post-detail.component.html',
  providers: [PostDetailService]
})

export class PostDetailComponent implements OnInit {

  postkey: any;
  postDetailResponseData: any;
  postCategoryArray: any;
  saveInArray: Array<string>;
  youtubePlayerURL: any;
  showYoutubePlayer: any;
  coverImageUrl:any;
  imageUrlArray: Array<any>;
  indexOfCoverImage:number= 0;
  isStoryBodyText:boolean=  false;
  storyBodyTextArray: Array<any>;
  isPostDetails: boolean = false;
  postUrl:any;
  sessionId:string;
  notLoggedIn:boolean = false;

  constructor(
    private postDetailService: PostDetailService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postkey = params['id']
    });
    if (this.postkey) {
      this.getPostDetailData(this.postkey);
    }
  }

  getPostDetailData(postkey: any) {
    let postDetailRequestData = {
      "careerName": "web",
      "deviceName": "browser",
      "platform": "browser",
      "imei": "",
      "time": "2017-7-12 13:55:53",
      "timeZone": "Asia/Calcutta"
    };
    postDetailRequestData["postKey"] = postkey;

    this.postDetailService.getPostDetailData(postDetailRequestData)
      .subscribe((postDetailResponseData) => {
        console.log(postDetailResponseData);
        this.postDetailResponseHandler(postDetailResponseData);
      })
  }

  postDetailResponseHandler(postDetailResponseData: any) {
    this.postDetailResponseData = postDetailResponseData;
    this.getImageUrl(this.indexOfCoverImage);
    this.getPostCategory();
    this.getPostSaveIn();
    this.postDetailsStoryBody();
  }

  getImageUrl(index: number) {
    this.indexOfCoverImage = index;
    console.log(index);
    let url = [];
    let postCover = this.postDetailResponseData.postDetail.userPost.postCover;
    if (postCover != null && postCover.length > 0 && postCover[0].url != null) {
      for(let i = 0; i < postCover.length; i++ ){
        if (postCover[i].url.indexOf("http") == -1) {
          url.push('http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + postCover[i].url)
        } else {
          url.push(postCover[i].url);
        }
      }
    }else{
      url.push("resources/background/placeholder_1.jpg");
    }
    this.coverImageUrl = url[this.indexOfCoverImage];
    this.imageUrlArray = url;
  }

  nextImage(){
    if( this.indexOfCoverImage < this.imageUrlArray.length-1){
      this.indexOfCoverImage++;
    }else{
      this.indexOfCoverImage = 0
    }
    this.getImageUrl(this.indexOfCoverImage);
  }

  previousImage(){
    if(this.indexOfCoverImage<=0){
      this.indexOfCoverImage = this.imageUrlArray.length-1;
    }else{
      this.indexOfCoverImage--;
    }
    this.getImageUrl(this.indexOfCoverImage);
  }

  isPostVideo():boolean{
    let videoPost = false;
    if(this.postDetailResponseData.postDetail.userPost.postCover.length > 0){
      if(this.postDetailResponseData.postDetail.userPost.postCover[0].type === 1){
        videoPost = true;
      }
    }
    return videoPost
  }

  getPostCategory() {
    console.log("loading");
    this.postCategoryArray = this.postDetailResponseData.postDetail.userPost.cotegory;
  }

  getPostCategoryImage(postCategory: any) {
    let postCategoryImage = postCategory.iconImageUrl.replace("size", "100");
    return postCategoryImage
  }

  getPostSaveIn() {
    let savedIn = this.postDetailResponseData.postDetail.userPost.savedIn;
    let newSaveInArray = [];
    let saveInArray = savedIn.split("#");
    let string = "#";

    for (let i = 1; i < saveInArray.length; i++) {
      newSaveInArray.push(string.concat(saveInArray[i]));
    }
    console.log("newTagArray", newSaveInArray);
    this.saveInArray = newSaveInArray;
    console.log("tagsArray", this.saveInArray);
  }

  getRandomColor(index: number) {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  playVideo(){
    this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+ this.postDetailResponseData.postDetail.userPost.postCover[0].videoId);
    //this.youtubePlayerURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.postDetailResponseData.postDetail.userPost.url);
    this.showYoutubePlayer = true;
  }

  closeVideo(){
    this.showYoutubePlayer=false;
  }

  postDetailsStoryBody(){
    let postBody = this.postDetailResponseData.postDetail.userPost.postBody;
    let bodyText= [] ;
    let storyBodyText = [];
    let imageInBody;
    for(let i = 0; i< postBody.length; i++){
      if(postBody[i].type == 2){
        imageInBody = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/'+ postBody[i].url;
        bodyText.push("<img src=" + imageInBody + ">"+"<br /><br />");
      }
      if(postBody[i].type == 4){
        bodyText.push(postBody[i].text + "<br />")
      }
      if(postBody[i].type == 1){
        imageInBody = postBody[i].url;
        bodyText.push("<div (click) = 'playStoryVideo()'>" + "<img src=" + imageInBody + ">"+"</div>"+"<br /><br />");
      }
      storyBodyText.push(this.sanitizer.bypassSecurityTrustHtml(bodyText[i]));
    }
    this.storyBodyTextArray = storyBodyText;
    console.log(this.storyBodyTextArray);
    /*let bodyTextString = bodyText.toString();
    console.log("bodyTextString",bodyTextString);
    let text = this.sanitizer.bypassSecurityTrustHtml(bodyTextString);
    if(text != null ){
      this.isStoryBodyText = true;
    }
    return text*/
  }

  playStoryVideo(){
    console.log("playing");
  }

  showPostDetails(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      this.sessionId = currentUser.token;
      this.isPostDetails = true;
      this.postUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.postDetailResponseData.postDetail.userPost.url);
    }else{
      console.log("loginApp");
      this.notLoggedIn = true
    }
  }
  closePost(){
    this.isPostDetails = false;
  }
}


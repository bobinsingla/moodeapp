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

  }

  getImageUrl(index: number) {
    this.indexOfCoverImage = index;
    console.log(index);
    let url = [];
    let postCover = this.postDetailResponseData.postDetail.userPost.postCover;
    if (postCover != null && postCover.length > 0) {
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
    if(this.postDetailResponseData.postDetail.userPost.postCover[0].type === 1){
      videoPost = true;
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
    let text = this.sanitizer.bypassSecurityTrustHtml(this.postDetailResponseData.postDetail.userPost.postBody[0].text);
    return text
  }
}


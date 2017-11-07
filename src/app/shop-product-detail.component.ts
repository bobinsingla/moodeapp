/**
 * Created by bobin on 17/10/17.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShopProductDetailService } from './shop-product-detail.service';

@Component({
  selector: 'shop-product',
  templateUrl: 'app/shop-product-detail.component.html',
  providers: [ShopProductDetailService]
})

export class ShopProductDetailComponent implements OnInit{
  objectKeys = Object.keys;
  productkey:string;
  productDetailResponseData:any;

  constructor(
    private route: ActivatedRoute,
    private shopProductDetailService: ShopProductDetailService
  ){

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productkey = params['id']
    });
    if (this.productkey) {
      this.getPostDetailData(this.productkey);
    }
  }

  getPostDetailData(productkey: any) {
    let productDetailRequestData = {
      "careerName": "web",
      "deviceName": "browser",
      "platform": "browser",
      "time": "2017-7-12 13:55:53",
      "timeZone": "Asia/Calcutta"
    };
    productDetailRequestData["productKey"] = productkey;

    this.shopProductDetailService.getShopProductDetailData(productDetailRequestData)
      .subscribe((productDetailResponseData) => {
        console.log(productDetailResponseData);
        this.shopProductDetailDataHandler(productDetailResponseData);
      })
  }

  shopProductDetailDataHandler(productDetailResponseData:any){
      this.productDetailResponseData = productDetailResponseData.getProductDetail.product;
  }

  getCoverImageUrl(){
    let url = this.productDetailResponseData.productMedia[0].url;
    url = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + url;
    return url
  }


}

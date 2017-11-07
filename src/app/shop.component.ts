import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ShopService } from './shop.service';

@Component({
	selector: 'my-shop',
	templateUrl : 'app/shop.component.html',
	styleUrls:['app/shop.component.css'],
	providers : [ ShopService ]
})


export class ShopComponent implements OnInit{
	shopContentArray:Array<any> = [];
	shopResponseData: any = [];
	pageId: number = 1;
	categoryId: any = "1";
	categoryArray:Array<any> = [];
	subCategoryArray: Array<any> = [];
	subCategoryDetailArray: Array<any>= [];

	constructor(
	  private shopService: ShopService,
    private router: Router
  ) {}

	ngOnInit(): void {
    	this.getShopData(this.pageId, this.categoryId);
    	this.getShopCategory();
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
       if(document.documentElement.scrollTop + document.documentElement.clientHeight== document.documentElement.scrollHeight) {
           if(this.shopContentArray !=null && this.shopContentArray[this.shopContentArray.length-1]!=null)
           {
            this.pageId++;
            this.getShopData(this.pageId, this.categoryId);
          }

       }
    }


	getShopData(id:number, categoryId:any){
		let requestShopData = {
			"brandList": [""],
			"careerName": "web",
			"categoryIDsList": ["1"],
			"deviceName": "browser",
			"imei": "1071216312982030",
			"pageID": 1,
			"platform": "browser",
			"price":{
				"highPrice": 50000,
				"lowPrice": 0
				},
			"productType": "",
			"sessionID": "xpdJhbCPRrxkpZyY",
			"shortType": "popularity",
			"storeIDsList": ["1"] ,
			"time": "2017-8-16 13:1:23",
			"timeZone": "Asia/Calcutta",
		};

		if(id){
			requestShopData["pageID"] = id;
		}
		if(categoryId){
			requestShopData["categoryIDsList"] = [categoryId];
		}

		const requestShopDataJson = JSON.stringify(requestShopData);

		this.shopService.getData(requestShopDataJson).subscribe(shopResponseData => {
    		console.log("shopResponseData", shopResponseData);
    		this.shopDataHandler(shopResponseData);
    	})
	}

  shopDataHandler(shopResponseData: any){
    let newObj  = shopResponseData.getShopProducts;
    for (let i = 0; i < newObj.productList.length; ++i) {
      this.shopContentArray.push(newObj.productList[i]);
    }
  }

	getShopCategory(){
		let shopCategoryRequestData = {
			"careerName":"web",
			"deviceName":"browser",
			"platform":"browser",
			"time":"2017-8-23 18:26:54",
			"timeZone":"Asia/Calcutta",
		};

		this.shopService.getShopCategory(shopCategoryRequestData)
			.subscribe(shopCategoryResponse => {
    			console.log("shopCategoryResponse", shopCategoryResponse);
    			this.shopCategoryHandler(shopCategoryResponse);
			});
	}

  shopCategoryHandler(shopCategoryResponse: any){
    this.categoryArray = shopCategoryResponse.getShopCategory.shopCategory ;
    this.subCategoryArray = shopCategoryResponse.getShopCategory.shopSubCategory;
    this.getSubCategory(this.categoryArray[0])
  }

  getSubCategory(category: any){
    let subCat = this.subCategoryArray;
    this.subCategoryDetailArray = [];
    console.log("subCat", subCat);
    for(let i = 0; i< this.subCategoryArray.length; i++){
      if(this.subCategoryArray[i].shopID == category.shopID){
        this.subCategoryDetailArray.push(subCat[i])
      }
    }
  }

	getShopSubCategory(subCategory:any){
    this.shopContentArray = [];
    this.categoryId = subCategory.subCatId;
    this.getShopData(this.pageId, this.categoryId);
    console.log("sub cat",subCategory);
    if(subCategory.child == false) {
      let shopSubCategoryRequestData = {
        "careerName": "web",
        "deviceName": "browser",
        "imei": "1071216312982030",
        "platform": "browser",
        "sessionID": "FXdhzLWtywPcikST",
        "shopID": "1",
        "subCatId": "1",
        "time": "2017-8-25 17:16:57",
        "timeZone": "Asia/Calcutta",
      };
      shopSubCategoryRequestData["subCatId"] = subCategory.subCatId;
      shopSubCategoryRequestData["shopID"] = subCategory.shopID;
      this.shopService.getShopSubCategory(shopSubCategoryRequestData)
        .subscribe(shopSubCategoryResponse => {
          console.log("shopSubCategoryResponse", shopSubCategoryResponse);
          this.shopSubCategoryResponseHandler(shopSubCategoryResponse);
        });
    }
	}

  shopSubCategoryResponseHandler(shopSubCategoryResponse:any){
    this.subCategoryDetailArray = [];
    let subCat = shopSubCategoryResponse.getShopSubCategory.shopSubCategory;
    for(let i = 0; i< subCat.length; i++){
        this.subCategoryDetailArray.push(subCat[i])
      }
  }

	getDataByCategory(category:any){
    console.log("getDataByCategory", category);
		this.pageId= 1;
		if(category.shopID == 1){
      this.categoryId = "1";
    }else{
      this.categoryId = "55";
    }
		this.shopContentArray = [];
    this.subCategoryDetailArray = [];
    this.getSubCategory(category);
		this.getShopData(this.pageId, this.categoryId);
	}

	getBackgroundCss(category:any){

  }

	getShopImageUrl(shopContent:any):string{
		let shopImage = 'http://res.cloudinary.com/moode-cloudinary/image/upload/v1504506749/' + shopContent.album[0]
		return shopImage
	}


	productMRP(shopContent: any):boolean{
		let mrp = false;
		if(shopContent.mrp != null && shopContent.mrp != 0 ){
			mrp = true;
		}
		return mrp;
	}


	productSellingPrice(shopContent: any):boolean{
		let sellingPrice = false;
		if(shopContent.sellingPrice != null && shopContent.sellingPrice != 0 ){
			sellingPrice = true;
		}
		return sellingPrice;
	}


	getBackgroundImage(){
		let imageUrl ;
		return imageUrl = "resources/icons/marketplace.png"
	}


	getSubCategoryImage(subCategory: any){
		let subCategoryImage = subCategory.imageName;
		subCategoryImage = subCategoryImage.replace("size", "100");
        return subCategoryImage;
	}

	goToProductDetail(shopContent: any){
    this.router.navigate(['/shop', shopContent.productKey])
  }
}

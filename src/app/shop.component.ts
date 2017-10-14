import { Component, HostListener } from '@angular/core';
import { ShopService } from './shop.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'my-shop',
	templateUrl : 'app/shop.component.html',
	styleUrls:['app/shop.component.css'],
	providers : [ ShopService ]
})



export class ShopComponent {
	Name = "Shop";
	shopContentArray:Array<any> = [];
	shopResponseData: any = [];
	pageId: number = 1;
	categoryId: any = "1";
	categoryArray:Array<any> = [];
	subCategoryArray: Array<any> = [];
	subCategoryMenArray: Array<any>= [];
	subCategoryWomenArray: Array<any>= [];

	constructor(private shopService: ShopService, private http: Http) {}

	ngOnInit(): void {
    	this.getData(this.pageId, this.categoryId);
    	this.getShopCategory();
    	this.getSubCategory(1);
    	this.getShopSubCategory();
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
       if(document.body.scrollTop + document.body.clientHeight== document.body.scrollHeight) {
           if(this.shopContentArray !=null && this.shopContentArray[this.shopContentArray.length-1]!=null)
           {
            this.pageId++;
            this.getData(this.pageId, this.categoryId);
          }

       }
    }


	getData(id:number, categoryId:any){
		let requestShopData = {
			"brandList": '',
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
			"storeIDsList":'' ,
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
    		this.shopHandler(shopResponseData);
    	})
	}

	getShopCategory(){
		let shopApi = "https://moodeapp.in/app/getShopCategory";
		let shopCategoryRequest = {
			"careerName":"web",
			"deviceName":"browser",
			"platform":"browser",
			"time":"2017-8-23 18:26:54",
			"timeZone":"Asia/Calcutta",
		};
		let headers = new Headers ({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, method: "post" });
		return this.http.post(shopApi, shopCategoryRequest, options)
			.map((res: Response) => res.json())
			.subscribe(shopCategoryResponse => {
    			console.log("shopCategoryResponse", shopCategoryResponse);
    			this.shopCategoryHandler(shopCategoryResponse);
			});
	}

	getShopSubCategory(){
		let shopSubCategoryApi = "https://moodeapp.in/app/getShopSubCategory";

		let shopSubCategoryRequest = {
			"careerName":"web",
			"deviceName":"browser",
			"imei":"1071216312982030",
			"platform":"browser",
			"sessionID":"FXdhzLWtywPcikST",
			"shopID":"1",
			"subCatId":"1",
			"time":"2017-8-25 17:16:57",
			"timeZone":"Asia/Calcutta",
		};

		let headers = new Headers ({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, method: "post" });
		return this.http.post(shopSubCategoryApi, shopSubCategoryRequest, options)
			.map((res: Response) => res.json())
			.subscribe(shopSubCategoryResponse => {
    			console.log("shopSubCategoryResponse", shopSubCategoryResponse);
/*    			this.shopCategoryHandler(shopCategoryResponse);
*/			});
	}

	shopHandler(shopResponseData: any){
		let newObj  = shopResponseData.getShopProducts;
	    for (let i = 0; i < newObj.productList.length; ++i) {
	       	this.shopContentArray.push(newObj.productList[i]);
	    }
	}

	shopCategoryHandler(shopCategoryResponse: any){
		this.categoryArray = shopCategoryResponse.getShopCategory.shopCategory ;
		this.subCategoryArray = shopCategoryResponse.getShopCategory.shopSubCategory;
	}

	/*shopSubCategory(){
		if(this.subCategoryArray[i]. ==){

		}
		if(this.subCategoryArray[i]){

		}
	}*/

	getCategory(categoryId:any){
		this.pageId= 1;
		this.categoryId = categoryId;
		this.shopContentArray = [];
		this.getData(this.pageId, this.categoryId);
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

	getSubCategory(shopID: number){
		let subCat = this.subCategoryArray;
		this.subCategoryMenArray = [];
		console.log("subCat", subCat);
		for(let i = 0; i< this.subCategoryArray.length; i++){
			if(this.subCategoryArray[i].shopID == shopID){
				this.subCategoryMenArray.push(subCat[i])
			}/*else{
				this.subCategoryWomenArray.push(subCat[i])
			}*/
		}
		console.log("Men", this.subCategoryMenArray);
	}

	getSubCategoryImage(subCategory: any){
		let subCategoryImage = subCategory.imageName;
		subCategoryImage = subCategoryImage.replace("size", "100");
        return subCategoryImage;
	}
}

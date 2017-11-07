import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ShopService{

	private shopUrl = "https://moodeapp.in/app/getShopProducts";
  private shopCategoryApi = "https://moodeapp.in/app/getShopCategory";
  private shopSubCategoryApi = "https://moodeapp.in/app/getShopSubCategory";


  constructor(private http: Http){}

	getData(requestShopDataJson: any){
		let headers = new Headers ({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, method: "post" });
		return this.http.post(this.shopUrl, requestShopDataJson, options)
			.map((res: Response) => res.json())
	}

	getShopCategory(shopCategoryRequestData: any){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.shopCategoryApi, shopCategoryRequestData, options)
      .map((res: Response) => res.json())
  }
  getShopSubCategory(shopSubCategoryRequestData: any){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.shopSubCategoryApi, shopSubCategoryRequestData, options)
      .map((res: Response) => res.json())
  }
}

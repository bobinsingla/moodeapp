/**
 * Created by bobin on 17/10/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ShopProductDetailService {
  private shopProductDetailApi = "https://moodeapp.in/app/getProductDetailOnWeb";

  constructor(private http:Http){}

  getShopProductDetailData(shopProductDetailRequestData: any){
    let headers = new Headers ({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });
    return this.http.post(this.shopProductDetailApi, shopProductDetailRequestData, options)
      .map((res: Response) => res.json())
  }
}

import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class ShopService{

	private apiUrl = "https://moodeapp.in/app/getShopProducts";

	constructor(private http: Http){}

	getData(requestShopDataJson: any){
		let headers = new Headers ({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, method: "post" });
		return this.http.post(this.apiUrl, requestShopDataJson, options)
			.map((res: Response) => res.json())
	}
}

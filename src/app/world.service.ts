import { Component, Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class WorldService{

	private apiUrl = "https://moodeapp.in/app/exploreUsersBook";

	constructor(private http: Http){}

	getData(worldRequestDataJson: any){
		let headers = new Headers ({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, method: "post" });
		return this.http.post(this.apiUrl, worldRequestDataJson, options)
			.map((res: Response) => res.json())
	}
}

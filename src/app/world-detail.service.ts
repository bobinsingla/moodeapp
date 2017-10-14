import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class WorldDetailService{
	private apiUrl = "https://moodeapp.in/app/userBookScreeningByWeb"

	constructor(private http:Http){}

	getData(worldRequestDataJson: any){
		console.log(worldRequestDataJson);
		let headers = new Headers ({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers, method: "post" });
		return this.http.post(this.apiUrl, worldRequestDataJson, options)
			.map((res: Response) => res.json())

	}
}

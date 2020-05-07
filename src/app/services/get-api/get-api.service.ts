import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

	private url: string = environment.baseUrl;

	constructor(public http: HttpClient) { }

	getMedia(nombre){
		let headers = new HttpHeaders();
		let ruta = this.url+"/media/"+nombre;
		return this.http.get(ruta, {headers: headers});
	}

}
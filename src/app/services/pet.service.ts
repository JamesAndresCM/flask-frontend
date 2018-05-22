import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Pet } from '../models/pet';
import { GLOBAL } from './global';
 

@Injectable()
export class PetService{

	public url:string;

	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	getPets(): Observable<any> {
  		return this._http.get(this.url+'pets', { observe: 'response'});
	}
	
	delPet(id): Observable<any> {
		return this._http.delete(this.url+'pet/'+id, { observe: 'response'});
	}
	
	getPetID(id): Observable<any>{
		return this._http.get(this.url+'pet/'+id, { observe: 'response'});
	}

	addPet(pet: Pet): Observable<any>{
		return this._http.post(this.url+'pet', pet, { observe: 'response'});
	}

	editPet(id , pet: Pet): Observable<any>{
		return this._http.patch(this.url+'pet/'+id, pet, { observe: 'response'});
	}
}
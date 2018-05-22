import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse,HttpRequest, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Persona } from '../models/persona';
import { GLOBAL } from './global';
 
/*
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'observe': 'response'
  })
};*/

@Injectable()
export class PersonaService{

	public url:string;

	constructor(public _http: HttpClient){
		this.url = GLOBAL.url;
	}

	getPersonas(): Observable<any>{
		return this._http.get(this.url+'personas', { observe: 'response'});
	}
	
	delPersona(id): Observable<any>{
		return this._http.delete(this.url+'persona/'+id, { observe: 'response'});
	}
	
	getPersonaID(id): Observable<any>{
		return this._http.get(this.url+'persona/'+id, { observe: 'response'});
	}
	
	addPersona(persona: Persona): Observable<any>{
		return this._http.post(this.url+'persona', persona, { observe: 'response'});
	}

	editPersona(id , persona: Persona): Observable<any>{
		return this._http.patch(this.url+'persona/'+id, persona, { observe: 'response'});
	}
}
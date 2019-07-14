import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
searchUser:string;
 githubUser:any;
// apiUrl = environment.apiUrl;
// access_token= environment.access_token;
  constructor(private http:HttpClien) { }
}

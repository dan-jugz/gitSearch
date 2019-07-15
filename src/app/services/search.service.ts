import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';



@Injectable({
  providedIn: 'root'
})
export class SearchService {
user:User;

  constructor(private http:HttpClient) { 
  this.user=new User("","","",0,0,0,0) 
  }

githubSearch(searchValue){
  
  interface ApiResponse{
    name:string;
    avatar_url:string;
    repos_url:string;
    public_repos:number;
    gists: number;
    followers:number;
    following: number;
  } 
  let promise =new Promise((resolve,reject)=>{
    this.http.get<ApiResponse>(`https://api.github.com/users/${searchValue}?access_token=${environment.access_token}`).toPromise().then(response=>{
        
        this.user.name=response.name;
        this.user.avatar_url=response.avatar_url;
        this.user.repos_url=response.repos_url;
        this.user.public_repos=response.public_repos;
        this.user.gists=response.gists;
        this.user.followers=response.followers;
        this.user.following=response.following;

        resolve()
    },
    error=>{
           
            reject(error)
        }
    )
})

return promise;
}

}
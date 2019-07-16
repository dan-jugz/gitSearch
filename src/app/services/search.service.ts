import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import{ RepoUser } from 'src/app/repo-user';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
user:User;
_newFetchedRepo:RepoUser;
_repoData=[];


  constructor(private http:HttpClient) { 
  this._newFetchedRepo=new RepoUser("","","",new Date(),"")
  this.user=new User("","","",0,0,0,0) 
  }

githubSearch(searchValue){
  
  interface ApiResponse{
    name:string;
    avatar_url:string;
    html_url:string;
    public_repos:number;
    gists: number;
    followers:number;
    following: number;
  } 
  let promise =new Promise((resolve,reject)=>{
    this.http.get<ApiResponse>(`https://api.github.com/users/${searchValue}?access_token=${environment.access_token}`).toPromise().then(response=>{
        
        this.user.name=response.name;
        this.user.avatar_url=response.avatar_url;
        this.user.html_url=response.html_url;
        this.user.public_repos=response.public_repos;
        this.user.gists=response.gists;
        this.user.followers=response.followers;
        this.user.following=response.following;

        resolve()
    },
    error=>{
           
            reject(error)
        }
    ),
    this.http.get<any>(`https://api.github.com/users/${searchValue}/repos?access_token=${environment.access_token}`).toPromise().then(response => {

      for (let i = 0; i < response.length; i++) {

        this._newFetchedRepo = new RepoUser(response[i].name, response[i].full_name, response[i].description,
          response[i].updated_at, response[i].html_url);
        this._repoData.push(this._newFetchedRepo)

      }

      resolve()

    }, error => {
      reject(error)
    })

})



return promise;
}

}
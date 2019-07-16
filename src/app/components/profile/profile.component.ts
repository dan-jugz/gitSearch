import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[SearchService]
})
export class ProfileComponent implements OnInit {

  constructor(private searchService:SearchService) { }

  _user:User;
  searchUsers:string='';
 _repos:any[]


  ngOnInit() {
  }
  
  submitSearch(search){
    this.searchService.githubSearch(this.searchUsers);
    this._repos=this.searchService._repoData
    this._user=this.searchService.user;
console.log(search.value);
  }

}

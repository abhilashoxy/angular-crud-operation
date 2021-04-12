

import { environment } from './../../environments/environment';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 url=environment.appUrl
  getUsersUrl:string=`${this.url}api/UserDetails`
  edituserUrl:string=`${this.url}api/UserDetails?id=`
  deleteuserUrl:string=`${this.url}api/UserDetails?id=`
  constructor(private http:HttpClient) { }

  getAllUsers():  Observable<User> {

    return this.http.get<User>(this.getUsersUrl);
  }
  editUser(id:any,user:any): Observable<any>{
   
   
    return this.http.put(this.edituserUrl+id, user);
  }
  deleteUser(id): Observable<any>{
    
    return this.http.delete(this.deleteuserUrl+id,{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }
  addUser(user:any): Observable<any>{
    console.log(this.getUsersUrl,user);
    return this.http.post(this.getUsersUrl,user);
  }
}

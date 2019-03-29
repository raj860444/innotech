import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }

  loginUser(userData){
    let result = JSON.stringify(userData)
    return this._http.post<any>('/api/users/login', JSON.parse(result));
  }

  registerUser(userData) {
    let result = JSON.stringify(userData)
    return this._http.post<any>('/api/users/signup', JSON.parse(result));
  }

  decode(){
    let type = localStorage.getItem('type');

    return type;
  }

  logoutUser() {
     localStorage.removeItem('token')
     this._router.navigate(['/login'])
   }

   getToken() {
     return localStorage.getItem('token')
   }

   loggedIn() {
     return !!localStorage.getItem('token')
   }
   forgotPassword(formData){
     return this._http.post<any>('/api/users/forgotPassword', formData)
   }
   resetPassword(token, formData){
     return this._http.post<any>('/api/users/resetPassword/'+token, formData)
   }
}

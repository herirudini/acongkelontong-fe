import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiURL: string = environment.ApiUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public localStorage: any;
  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.put(`${apiURL}/login`, data);
  }
  forgetPassword(data: any) {
    return this.http.put(`${apiURL}/login/forget-password`, data);
  }
  resetPassword(user_id: any, superkey: any, data: any) {
    return this.http.patch(`${apiURL}/login/reset-password/${user_id}/${superkey}`, data);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getUserRole() {
    return localStorage.getItem('role');
  }
  getIsLogin() {
    const token = this.getToken();
    if (token == null) {
      return false;
    } else return true;
  }
  logout() {
    const isLogin = this.getIsLogin();
    if (isLogin == true) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
    };
    this.router.navigate(['login']);
    return this.http.delete(`${apiURL}/logout`);
  }
}

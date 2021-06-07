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
  public isLoggedIn = true || false;
  public userRole: any;
  public loginStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return localStorage.getItem('access_token');
  }
  getUserRole() {
    return this.userRole;
  }
  getAuthStatusListener() {
    return this.loginStatusListener.asObservable();
  }
  login(reqBody: any) {
    return this.http.put<{ logToken: string }>(`${apiURL}/login`, reqBody);
  }
  forgetPassword(reqBody: any) {
    return this.http.put<{ logToken: string }>(`${apiURL}/login/forget-password`, reqBody);
  }
  resetPassword(user_id: any, superkey: any, reqBody: any) {
    return this.http.put<{ logToken: string }>(`${apiURL}/login/reset-password/${user_id}/${superkey}`, reqBody);
  }
  getIsLogin() {
    const token = this.getToken();
    if (token != null) {
      this.isLoggedIn = true;
    } else this.isLoggedIn = false;
    return this.isLoggedIn;
  }
  logout() {
    const isLogin = this.getIsLogin();
    if (isLogin == true) {
      localStorage.removeItem('access_token')
    };
    this.router.navigate(['login']);
    return this.http.delete(`${apiURL}/logout`);
  }
}

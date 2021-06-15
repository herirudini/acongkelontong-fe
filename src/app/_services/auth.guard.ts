import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements OnInit, CanActivate {
  arrayRouter!: any;
  routerRole!: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  canActivate(
    actRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.routerRole = actRoute.data[0];
    const isLogin = this.authService.getIsLogin();
    const userRole = this.authService.getUserRole();
    console.log(this.routerRole);
    if (isLogin == false) {
      alert('login terlebih dahulu');
      this.router.navigate(['login']);
    } else if (this.routerRole != userRole && userRole != 'owner') {
      alert('unauthorized!');
      this.router.navigate([userRole]);
    }
    return true;
  }
}

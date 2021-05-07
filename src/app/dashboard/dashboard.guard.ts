import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthControllerService } from './../auth-controller.service';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private authService: AuthControllerService) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.canAuth("dashboard");
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthenticateAction } from '../actions/authenticate.action';
import { AuthModel, AuthService } from './../../../auth.service';
import { LogoutAction } from './../actions/logout.action';

export interface AuthStateModel {
  login: string;
  password: string;
  authKey: string;
  permissions: string[]
}

@State<AuthStateModel>({
  name: 'Login',
  defaults: {
    login: undefined,
    password: undefined,
    authKey: undefined,
    permissions: []
  }
})

@Injectable()
export class AuthState {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  @Selector()
  static loginData(state: AuthStateModel): AuthStateModel {
    return state;
  }

  @Action(AuthenticateAction)
  storeLoginData(ctx: StateContext<AuthStateModel>, action: AuthenticateAction) {
    return this.http.get<AuthModel>('/assets/auth.json', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(authData => {
        const key = this.authService.getAuthByUser(authData, action.login, action.password);
        ctx.patchState({
          authKey: key,
          login: action.login,
          password: action.password,
          permissions: this.authService.getPermissions(authData, key)
        });
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      }),
      catchError(error => {
        window.alert(JSON.stringify(error))
        return of(undefined);
      }),
    )
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>, action: LogoutAction) {
    ctx.patchState({
      authKey: undefined,
      login: undefined,
      password: undefined,
      permissions: []
    });
    this.ngZone.run(() => {
      this.router.navigate(['']);
    });
    return of(true);
  }
}

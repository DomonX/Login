import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { AuthState, AuthStateModel } from './store/login/state/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthControllerService {

  @Select(AuthState) loginState$: Observable<AuthStateModel>;

  private loginData: AuthStateModel;

  private subscription: Subscription;

  constructor(private store: Store, private http: HttpClient) {
    // Service is singleton there is no reason to unsubscribe
    this.subscription = this.loginState$.subscribe(s => {
      this.loginData = s
    });
  }

  public canAuth(permission: string): boolean {
    return this.loginData.permissions.find(i => i === permission) !== undefined;
  }

  public getKey(): string {
    return this.loginData.authKey;
  }
}

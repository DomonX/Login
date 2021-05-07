import { Injectable } from '@angular/core';

export interface AuthModel {
  accounts: { [index: string]: { login: string, password: string } },
  permissions: { [index: string]: string[] }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAuthByUser(data: AuthModel, login: string, password: string): string {
    return Object.keys(data.accounts)
      .filter(key => data.accounts[key].login === login && data.accounts[key].password === password)
      .reduce((acc, curr) => {
        if(acc) {
          throw "[AuthService] Multiple user with same credentials";
        }
        return curr;
      }, undefined);
  }
  getPermissions(data: AuthModel, key: string): string[] {
    return data.permissions[key];
  }
}

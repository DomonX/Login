import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthenticateAction } from './../store/login/actions/authenticate.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private login: string;
  private password: string;

  constructor(private store: Store) { }

  public loginClicked() {
    this.store.dispatch(new AuthenticateAction(this.login, this.password));
  }

  public changeLogin(event: any) {
    this.login = event.srcElement.value;
  }

  public changePassword(event: any) {
    this.password = event.srcElement.value;
  }

  ngOnInit() { }
}

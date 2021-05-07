import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { LogoutAction } from './../store/login/actions/logout.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() { }

  public logout(): void {
    this.store.dispatch(new LogoutAction());
  }

}

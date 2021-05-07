export class AuthenticateAction {
  static readonly type = '[App] Store Login Data';
  constructor(public login: string, public password: string) {}
}

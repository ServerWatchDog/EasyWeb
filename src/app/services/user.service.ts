import {Injectable} from '@angular/core';
import {SecurityService} from "./security.service";
import {SessionHttpService} from "./connect/session-http.service";
import {emptyLoginInfo, GlobalService, LoginInfo} from "./global.service";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  info: LoginInfo = emptyLoginInfo();

  constructor(
    private security: SecurityService,
    private http: SessionHttpService,
    private global: GlobalService,
    private session:SessionService
  ) {
    global.getLoginInfo(info => {
      this.info = info
    })
  }


  login(email: string, password: string, success: () => void, fail: (msg: string) => void) {
    const loginData = ({
      email: email,
      password: password,
      code: ''
    });
    this.http.post('/view/user/login', loginData, () => {
      success()
    }, (code, message) => {
      fail(message)
    })
  }

  logout() {
    this.http.get('/view/user/logout', () => {
    }, () => {
    })
    this.session.clear()
  }
}

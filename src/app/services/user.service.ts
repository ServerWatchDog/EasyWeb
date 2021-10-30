import {Injectable} from '@angular/core';
import {SecurityService} from "./security.service";
import {SessionHttpService} from "./session-http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userName = '未登陆';
  isLogin = false;
  userImage = '';

  constructor(
    private security: SecurityService,
    private http: SessionHttpService
  ) {
  }

  update() {
    this.status((status, data) => {
      if (status) {
        this.userName = data.userName;
        this.isLogin = true;
        this.userImage = data.icon;
      } else {
        this.userName = '未登陆';
        this.isLogin = false;
        this.userImage = '';
      }
    })
  }

  status(status: (status: boolean, data: any) => void) {
    this.http.get('/users/status', (msg) => {
      status(true, msg)
    }, () => status(false, null))
  }

  login(email: string, password: string, success: () => void, fail: (msg: string) => void) {
    const loginData = ({
      email: email,
      password: this.security.encryptWithPublicKey(password),
    });
    this.http.post('/users/login', loginData, () => {
      success()
    }, (code, message) => {
      fail(message)
    })
  }

  logout() {
    this.http.get('/users/logout', () => {
      this.userName = '未登陆';
      this.isLogin = false;
      this.userImage = '';
    }, () => {
      this.userName = '未登陆';
      this.isLogin = false;
      this.userImage = '';
    })
  }
}

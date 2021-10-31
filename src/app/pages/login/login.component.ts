import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../services/title.service";
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SecurityHttpService} from "../../services/connect/security-http.service";
import {HttpService} from "../../services/connect/http.service";
import {LoginResultView, LoginResultViewStatus} from "../../models/login-result-view";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(titleService: TitleService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              private route: Router,
              private http: HttpService,
              private session: SessionService,
              private securityHttp: SecurityHttpService) {
    titleService.setTitle("登录")
  }

  showCode = false

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    code: ['', []]
  })

  ngOnInit(): void {
  }

  login() {
    const post = {
      "account": this.loginForm.value.email,
      "password": this.loginForm.value.password,
      "code": this.loginForm.value.code
    }
    this.securityHttp.post<LoginResultView>('/view/user/login', this.http, post, (data) => {
      if (data.status as LoginResultViewStatus == LoginResultViewStatus.SUCCESS) {
        this.showCode = true
        switch (data.status as LoginResultViewStatus) {
          case LoginResultViewStatus.NEED_2FA:
            this._snackBar.open("需要2FA验证码", "确定", {
              duration: 1000
            })
            break;
          case LoginResultViewStatus.NEED_EMAIL:
            this._snackBar.open("需要邮箱验证码", "确定", {
              duration: 1000
            })
            break;
          case LoginResultViewStatus.NEED_SMS:
            this._snackBar.open("需要短信验证码", "确定", {
              duration: 1000
            })
            break;
        }
      } else {
        this._snackBar.open("登陆成功！", "确定", {
          duration: 1000
        })
        this.session.updateSessionId(data.token)
        this.route.navigate(['/dashboard']).then()
      }
    }, (code, message) => {
      this._snackBar.open("登陆失败，" + message + "！", "确定", {
        duration: 1000
      })
    })


  }
}

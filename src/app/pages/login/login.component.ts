import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../services/title.service";
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
              private user: UserService) {
    titleService.setTitle("登录")
  }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
  }

  login() {
    this.user.login(this.loginForm.value.email, this.loginForm.value.password, () => {
        this._snackBar.open("登陆成功！", "确定", {
          duration: 1000
        })
        this.route.navigate(['/']).then()
      },
      (msg) => {
        this._snackBar.open("登陆失败，" + msg + "！", "确定", {
          duration: 1000
        })
      })

  }
}

import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {GlobalService, InitStatus} from "../services/global.service";
import {TitleService} from "../services/title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  status = '正在初始化';
  finish = false

  constructor(private global: GlobalService,
              private route: Router
    , private title: TitleService) {

  }

  ngOnInit(): void {
    this.title.setTitle('初始化')
    if (environment.production) {
      console.info("Prod Mode.")
    } else {
      console.warn("Dev Mode.")
    }
    this.global.globalInit((status) => {
      switch (status) {
        case InitStatus.NETWORK_ERROR:
          this.route.navigate(['502']).then()
          break;
        case InitStatus.NOT_INSTALL:
          this.route.navigate(['/install']).then()
          break;
        case InitStatus.NOT_LOGIN:
          this.route.navigate(['/login']).then()
          break;
        case InitStatus.SUCCESS:
          if ('/' == decodeURI(window.location.pathname)) {
            this.route.navigate(['dashboard']).then()
          } else {

          }
          break;
      }
      this.finish = true
    })
  }

}

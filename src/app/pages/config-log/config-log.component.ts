import {Component, OnInit} from '@angular/core';
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";
import {TitleService} from "../../services/title.service";
import {Router} from "@angular/router";
import {ChildRoute} from "../config-user/config-user.component";

@Component({
  selector: 'app-config-log',
  templateUrl: './config-log.component.html',
  styleUrls: ['./config-log.component.scss']
})
export class ConfigLogComponent implements OnInit {

  links: ChildRoute[] = [{
    name: '用户日志',
    url: '/log/user'
  }, {
    name: '终端日志',
    url: '/log/client'
  }];
  activeLink = this.links[0];
  constructor(public dash: DashboardDrawerService,private title:TitleService,
              private route:Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("日志管理")
    if ('/log' == decodeURI(window.location.pathname)) {
      this.route.navigate(['log','user']).then()
    }
    for (let link of this.links) {
      if (link.url == window.location.pathname){
        this.activeLink = link
      }
    }
  }
}

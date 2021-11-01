import {Component, OnInit} from '@angular/core';
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";
import {TitleService} from "../../services/title.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.component.html',
  styleUrls: ['./config-user.component.scss']
})
export class ConfigUserComponent implements OnInit {

  links: ChildRoute[] = [{
    name: '用户管理',
    url: '/user/user'
  }, {
    name: '角色管理',
    url: '/user/group'
  }];
  activeLink = this.links[0];


  constructor(
    public dash: DashboardDrawerService, private title: TitleService,
    private route:Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("用户管理")
    if ('/user' == decodeURI(window.location.pathname)) {
      this.route.navigate(['user','user']).then()
    }
    for (let link of this.links) {
      if (link.url == window.location.pathname){
        this.activeLink = link
      }
    }
  }

}

export interface ChildRoute {
  name: string,
  url: string
}

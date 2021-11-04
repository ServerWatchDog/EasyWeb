import {Component, Input, OnInit} from '@angular/core';
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";
import {TitleService} from "../../services/title.service";
import {ChildRoute} from "../config-user/config-user.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-config-client',
  templateUrl: './config-client.component.html',
  styleUrls: ['./config-client.component.scss']
})
export class ConfigClientComponent implements OnInit {
  links: ChildRoute[] = [{
    name: '终端管理',
    url: '/client/client'
  }, {
    name: '分组管理',
    url: '/client/group'
  }];
  activeLink = this.links[0];
  constructor(public dash: DashboardDrawerService,private title:TitleService,
              private route:Router) {
  }

  ngOnInit(): void {
    this.title.setTitle("终端管理")
    if ('/client' == decodeURI(window.location.pathname)) {
      this.route.navigate(['client','client']).then()
    }
    for (let link of this.links) {
      if (link.url == window.location.pathname){
        this.activeLink = link
      }
    }
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";
import {TitleService} from "../../services/title.service";

@Component({
  selector: 'app-config-client',
  templateUrl: './config-client.component.html',
  styleUrls: ['./config-client.component.scss']
})
export class ConfigClientComponent implements OnInit {

  constructor(public dash: DashboardDrawerService,private title:TitleService) {
  }

  ngOnInit(): void {
    this.title.setTitle("终端管理")
  }

}

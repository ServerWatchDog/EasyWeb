import {Component, OnInit} from '@angular/core';
import {TitleService} from "../../services/title.service";
import {GlobalService} from "../../services/global.service";
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  dashDrawer:DashboardDrawerService
  constructor(private pDash:DashboardDrawerService,
    private titleService: TitleService,
              private globalService: GlobalService) {
    this.dashDrawer = pDash;
  }

  ngOnInit(): void {
    this.titleService.setTitle("控制台")
  }

}

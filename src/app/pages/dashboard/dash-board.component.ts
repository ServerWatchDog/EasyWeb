import {Component, OnInit} from '@angular/core';
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(
    public dash: DashboardDrawerService
  ) {
  }

  ngOnInit(): void {
  }


}

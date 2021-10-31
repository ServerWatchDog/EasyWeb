import {Component, OnInit} from '@angular/core';
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  constructor(
    private dash: DashboardDrawerService
  ) {
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.dash.toggle()
  }
}

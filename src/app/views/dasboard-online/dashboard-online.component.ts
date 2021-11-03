import {Component, OnInit} from '@angular/core';
import {SessionHttpService} from "../../services/connect/session-http.service";

@Component({
  selector: 'app-dashboard-online',
  templateUrl: './dashboard-online.component.html',
  styleUrls: ['./dashboard-online.component.scss']
})
export class DashboardOnlineComponent implements OnInit {

  dataSource: OnlineData = {data: []}

  constructor(private http: SessionHttpService) {
  }

  ngOnInit(): void {
    this.update()
  }

  update() {
    this.http.get<OnlineData>('/online', res => {
      this.dataSource = res
    })
  }

  formatDisk(disk: number): string {
    if (disk > 1_000_000_000_000) {

      return (disk / 1_000_000_000_000).toFixed(1) + "T"
    }else if (disk > 1_000_000_000) {
      return (disk / 1_000_000_000).toFixed(1) + "G"
    } else if (disk > 1_000_000) {
      return (disk / 1_000_000).toFixed(1) + "M"
    }else if (disk > 1_000) {
      return (disk / 1_000).toFixed(1) + "K"
    }else {
      return disk + 'B'
    }
  }
}

export interface OnlineData {
  data: OnlineDataItem[

    ]
}

export interface OnlineDataItem {
  "name": string,
  "arch": string,
  "system": string,
  "cpuName": string,
  "cpuStage": number,
  "memory": number,
  "userMemory": number,
  "disk": number,
  "usedDisk": number,
  "usedNetwork": number
}

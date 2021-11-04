import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {SessionHttpService} from "../../services/connect/session-http.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {ClientSelectorComponent} from "../../views/client-selector/client-selector.component";
import {LogData} from "../config-log-client/config-log-client.component";
import {UserSelectorComponent} from "../../views/user-selector/user-selector.component";

@Component({
  selector: 'app-config-log-user',
  templateUrl: './config-log-user.component.html',
  styleUrls: ['./config-log-user.component.scss']
})
export class ConfigLogUserComponent implements OnInit {

  datepipe: DatePipe = new DatePipe('en-US')

  constructor(
    private http: SessionHttpService,
    private dialog: MatDialog
  ) {
  }

// /api/log/user/{userId}/{date}
  dataSource: LogData = {
    data: [], pageCount: 0, pageIndex: 0, size: 0
  };
  displayedColumns: string[] = ['name', 'message', 'tag', 'date'];
  selectItem = '';
  selectDate = new FormControl()

  ngOnInit(): void {
  }

  select() {
    let date = this.datepipe.transform(this.selectDate.value, 'YYYY-MM-dd')
    let id = this.selectItem
    if (id == null || id == '') {
      return
    }
    this.http.get<LogData>('/log/user/' + id + '/' + date, res => {
      this.dataSource = res
    })
  }

  choose() {
    this.dialog.open(UserSelectorComponent, {
      width: '400px'
    }).afterClosed().subscribe(it => {
      this.selectItem = it.id
    })
  }
}

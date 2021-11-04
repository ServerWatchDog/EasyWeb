import {Component, OnInit} from '@angular/core';
import {SessionHttpService} from "../../services/connect/session-http.service";
import {MatDialog} from "@angular/material/dialog";
import {ClientSelectorComponent} from "../../views/client-selector/client-selector.component";
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-config-log-client',
  templateUrl: './config-log-client.component.html',
  styleUrls: ['./config-log-client.component.scss']
})
export class ConfigLogClientComponent implements OnInit {

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
    this.http.get<LogData>('/log/client/' + id + '/' + date, res => {
      this.dataSource = res
    })
  }

  choose() {
    this.dialog.open(ClientSelectorComponent, {
      width: '400px'
    }).afterClosed().subscribe(it => {
      this.selectItem = it.id
    })
  }
}

export interface LogData {
  "data": {
    "name": string,
    "message": string,
    "tag": string,
    "date": string
  }[

    ],
  "pageIndex": number,
  "pageCount": number,
  "size": number
}

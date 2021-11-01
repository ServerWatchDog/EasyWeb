import {Component, Input, OnInit} from '@angular/core';
import {CrudData} from "../../models/crud-data";
import {CrudClient, CrudInsertClient} from "../../models/crud-client";
import {SessionHttpService} from "../../services/connect/session-http.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {UserConfigDialog} from "../config-user/config-user.component";
import {ClientInsertDialog} from "./client-insert-dialog";
import {ClientOptionDialog} from "./client-options-dialog";
import {DeleteViewComponent} from "../../views/delete-view/delete-view.component";

@Component({
  selector: 'app-config-client-user',
  templateUrl: './config-client-user.component.html',
  styleUrls: ['./config-client-user.component.scss']
})
export class ConfigClientUserComponent implements OnInit {

  clientData: CrudData<CrudClient> = {
    data: [], pageCount: 0, pageIndex: 0, size: 0

  };

  constructor(
    private http: SessionHttpService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.select()
  }


  select() {
    this.http.get<CrudData<CrudClient>>('/admin/client?index=0&size=99999', success => {
      this.clientData = success;
    })
  }

  update(data: CrudClient) {
    this.dialog.open(ClientOptionDialog, {
      width: '500px',
      data: data,
    }).afterClosed().subscribe(res => {
      if (res != null) {
        this.http.put<CrudClient>('/admin/client/' + data.id, res, result => {
          this.select()

        })
      }
    })
  }

  delete(data: CrudClient) {
    this.dialog.open(DeleteViewComponent, {
      data:'是否确认删除终端  \"' + data.name + '\"? 删除后将不可恢复！',
      width:'400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.http.delete('/admin/client/' + data.id, () => {
          this.select()

        })
      }
    })
  }

  insert() {
    this.dialog.open(ClientInsertDialog, {
      width: '500px'
    })
      .afterClosed()
      .subscribe(result => {
        if (result === '' || result == null) {
          this._snackBar.open('输入不正确！', '', {
            duration: 1000
          })

          return;
        }
        const data: CrudInsertClient = {
          enabled: result.e, linkedGroup: [], linkedUser: result.u, name: result.n, refreshToken: false

        };
        this.http.post<CrudClient>('/admin/client', data, () => {
          this.select()
        })


      })
  }
}

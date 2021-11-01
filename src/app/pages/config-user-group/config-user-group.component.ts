import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CRUDUserGroup} from "../../models/crud-group";
import {CrudData} from "../../models/crud-data";
import {PageEvent} from '@angular/material/paginator';
import {SessionHttpService} from "../../services/connect/session-http.service";
import {DataSource} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {UserGroupInsertComponent} from "../../views/user-group-insert/user-group-insert.component";
import {DeleteViewComponent} from "../../views/delete-view/delete-view.component";

@Component({
  selector: 'app-config-user-group',
  templateUrl: './config-user-group.component.html',
  styleUrls: ['./config-user-group.component.scss']
})
export class ConfigUserGroupComponent implements OnInit {
  data: CrudData<CRUDUserGroup> = {data: [], pageCount: 20, pageIndex: 1, size: 0}

  constructor(private http: SessionHttpService,
              private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['name', 'users', 'authorities', 'config'];
  dataSource = new MatTableDataSource<CRUDUserGroup>(this.data.data);


  ngOnInit(): void {
    this.select(0)
  }

  private select(index: number) {
    this.http.get<CrudData<CRUDUserGroup>>('/admin/group?index=' + index + "&size=20", res => {
      this.data = res
      this.dataSource.data = res.data
    })
  }

  edit(element: CRUDUserGroup) {
    this.dialog.open(UserGroupInsertComponent, {
      width: '400px',
      data: element
    }).afterClosed().subscribe(res => {
      this.http.put<CRUDUserGroup>('/admin/group/' + element.id, res, success => {
        this.select(0)
      })
    })
  }

  delete(element: CRUDUserGroup) {
    this.dialog.open(DeleteViewComponent, {
      width: '400px',
      data: '你确定删除角色 \"' + element.name + '\"吗？此操作不可恢复！'
    }).afterClosed().subscribe(res=>{
      if(res){
        this.http.delete<CRUDUserGroup>('/admin/group/' + element.id,  success => {
          this.select(0)
        })
      }

    })
  }

  add() {
    this.dialog.open(UserGroupInsertComponent, {
      width: '400px'
    }).afterClosed().subscribe(res => {
      this.http.post<CRUDUserGroup>('/admin/group', res, success => {
        this.select(0)
      })
    })
  }

  configPage(event: PageEvent) {

  }

  formatUser(users: any[]): string {
    return users.map(data => {
      return data.name
    }).toLocaleString();
  }

  formatAuthority(authorities: string[]): string {
    return authorities.toLocaleString().substr(0, 20) + "..."
  }
}

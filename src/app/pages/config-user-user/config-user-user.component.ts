import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";
import {UserConfigService, UserInsert, UserItem} from "../../services/user-config.service";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SessionHttpService} from "../../services/connect/session-http.service";
import {FormControl} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteViewComponent} from "../../views/delete-view/delete-view.component";
import {UserGroupSelectorComponent} from "../../views/user-group-selector/user-group-selector.component";
import {MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-config-user-user',
  templateUrl: './config-user-user.component.html',
  styleUrls: ['./config-user-user.component.scss']
})
export class ConfigUserUserComponent implements AfterViewInit {

  constructor(
    public userConfig: UserConfigService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.initPage(0)
  }

  displayedColumns: string[] = ['name', 'email', 'password', 'registerDate', 'groupName', 'config'];
  dataSource = new MatTableDataSource<UserItem>(this.userConfig.data);

  edit(item: UserItem) {
    this.dialog.open(UserConfigDialog, {
      width: '400px',
      data: item
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.userConfig.update(item.id, result, () => {
          this._snackBar.open("更新成功！", "确定", {
            duration: 1000
          })
          this.initPage(0)
        }, msg => {
          this._snackBar.open("更新失败，" + msg, "确定", {
            duration: 1000
          })
        })
      }
    })
  }

  delete(item: UserItem) {
    this.dialog.open(DeleteViewComponent, {
      width: '400px',
      data: '你确定删除用户  \"' + item.name + "\" 吗？删除后将不可恢复！"
    }).afterClosed().subscribe(result => {
      if (result == true) {
        this.userConfig.delete(item.id, () => {
          this._snackBar.open("删除成功！", "确定", {
            duration: 1000
          })
          this.initPage(0)
        }, msg => {
          this._snackBar.open("删除失败，" + msg, "确定", {
            duration: 1000
          })
        })
      }
    })
  }

  add() {
    this.dialog.open(UserConfigDialog, {
      width: '400px',
      data: null
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.userConfig.insert(result, () => {
          this.initPage(0)
        }, msg => {
          this._snackBar.open("操作失败，" + msg, "确定", {
            duration: 1000
          })
        })
      }
    })
  }

  configPage(event: PageEvent) {
    this.initPage(event.pageIndex)
  }

  initPage(index: number) {
    this.userConfig.select(index, 20, () => {
      this.dataSource.data = this.userConfig.data
    })
  }
}

@Component({
  selector: 'user-config-dialog',
  templateUrl: 'user-config-dialog.html',
  styleUrls: ['user-config-dialog.scss']
})
export class UserConfigDialog {
  name = new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  group = ''

  constructor(
    public dialogRef: MatDialogRef<UserConfigDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: UserItem | null) {
    if (data != null) {
      this.name.setValue(data.name)
      this.email.setValue(data.email)
      this.group = data.groupName
    }
  }


  closeClick(): void {
    this.dialogRef.close();
  }

  post(): UserInsert {
    return {
      group: this.group,
      password: this.password.value,
      name: this.name.value,
      email: this.email.value,
    }
  }

  selectGroup() {
    this.dialog.open(UserGroupSelectorComponent).afterClosed().subscribe(next => {
      if (next != null) {
        this.group = next.name
      }
    })
  }
}

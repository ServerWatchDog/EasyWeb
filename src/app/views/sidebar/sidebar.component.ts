import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {TitleService} from "../../services/title.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DashboardDrawerService} from "../../services/dashboard-drawer.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public user: UserService,
              private dash:DashboardDrawerService,
              private route: Router,
              public dialog: MatDialog) {
  }

  private defaultMenu: Menu[] = [
    {
      title: '控制台',
      url: '/dashboard'
    },
    {
      title: '终端管理',
      url: '/client'
    },{
      title: '用户管理',
      url: '/user'
    },
  ]
  menu: Menu[] = [...this.defaultMenu];

  ngOnInit(): void {
  }

  openUrl(path: string) {
    this.dash.toggle()
    this.route.navigate([path]).then()
  }

  logout() {
    this.dialog.open(SidebarDialogComponent)
  }

  select(url: string) {
    if (url == decodeURI(window.location.pathname)) {
      return "item-select"
    } else {
      return "item-no-select"
    }
  }

}

export interface RemoteMenu {
  name: string,
  count: string
}

@Component({
  selector: 'app-sidebar-dialog',
  templateUrl: './sidebar-dialog.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SidebarDialogComponent>,
    public user: UserService,
    private snackBar: MatSnackBar,
    private route: Router) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  onYesClick(): void {
    this.dialogRef.close();
    {
      this.user.logout()
      this.route.navigate(['/login']).then()
      this.snackBar.open("注销成功", "", {duration: 1000})
    }

  }
}

export interface Menu {
  title: string,
  url: string
}

import {Component, OnInit} from '@angular/core';
import {UserItem, Users} from "../../services/user-config.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SessionHttpService} from "../../services/connect/session-http.service";
import {CRUDUserGroup} from "../../models/crud-group";
import {CrudData} from "../../models/crud-data";

@Component({
  selector: 'app-user-group-selector',
  templateUrl: './user-group-selector.component.html',
  styleUrls: ['./user-group-selector.component.scss']
})
export class UserGroupSelectorComponent {
  groups: CRUDUserGroup [] = []

  constructor(
    public dialogRef: MatDialogRef<UserGroupSelectorComponent>,
    private sHttp: SessionHttpService
  ) {
    this.updateUsers(0)
  }

  updateUsers(index: number) {
    this.sHttp.get<CrudData<CRUDUserGroup>>("/admin/group?index=" + index + "&size=9999", res => {
      this.groups = res.data
    })
  }

  closeClick() {
    this.dialogRef.close()
  }

  select(group: CRUDUserGroup) {
    this.dialogRef.close(group)
  }

  users(users: [{ id: string; name: string; email: string }]): string {
    return users.map(data => {
      data.name
    }).toLocaleString()
  }
}

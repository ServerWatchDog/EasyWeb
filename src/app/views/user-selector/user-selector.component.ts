import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserItem, Users} from "../../services/user-config.service";
import {SessionHttpService} from "../../services/connect/session-http.service";

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent {
  users: UserItem [] = []

  constructor(
    public dialogRef: MatDialogRef<UserSelectorComponent>,
    private sHttp: SessionHttpService
  ) {
    this.updateUsers(0)
  }

  updateUsers(index: number) {
    this.sHttp.get<Users>("/admin/user?index=" + index + "&size=9999" , res => {
      this.users = res.data
    })
  }

  closeClick() {
    this.dialogRef.close()
  }

  select(user: UserItem) {
    this.dialogRef.close(user)
  }
}

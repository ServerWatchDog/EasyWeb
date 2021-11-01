import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SessionHttpService} from "../../services/connect/session-http.service";
import {UserItem} from "../../services/user-config.service";
import {CrudClient, CrudInsertClient} from "../../models/crud-client";
import {UserSelectorComponent} from "../../views/user-selector/user-selector.component";

@Component({
  selector: 'client-options-dialog',
  templateUrl: 'client-options-dialog.html',
  styleUrls: ['client-dialog.scss']
})
export class ClientOptionDialog {

  userName = ''

  insert: CrudInsertClient = {
    enabled: false, linkedGroup: [], linkedUser: "", name: "", refreshToken: false
  }

  constructor(
    public dialogRef: MatDialogRef<ClientOptionDialog>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: CrudClient) {
    this.insert.name = data.name;
    this.insert.linkedUser = data.user.id;
    this.insert.linkedGroup = data.groups.map(data => {
      return data.id.toString()
    });
    this.insert.enabled = data.enabled
    this.userName = data.user.name
  }


  selectUser() {
    this.dialog.open(UserSelectorComponent).afterClosed().subscribe(res => {
      this.insert.linkedUser = res.id;
      this.userName = res.name;
    })
  }

  closeClick() {
    this.dialogRef.close()
  }

  submitClick() {
    this.dialogRef.close(this.insert)
  }
}

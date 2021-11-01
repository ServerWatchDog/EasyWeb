import {Component} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserSelectorComponent} from "../../views/user-selector/user-selector.component";
import {UserItem} from "../../services/user-config.service";

@Component({
  selector: 'client-insert-dialog',
  templateUrl: 'client-insert-dialog.html',
  styleUrls: ['client-dialog.scss']
})
export class ClientInsertDialog {

  name = ''
  user: UserItem | null = null;
  enableClient = false;

  constructor(
    public dialogRef: MatDialogRef<ClientInsertDialog>, public dialog: MatDialog) {
  }

  selectUser() {
    this.dialog.open(UserSelectorComponent).afterClosed().subscribe(res=>{
      this.user = res;
    })
  }

  closeClick() {
    this.dialogRef.close()
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {CRUDGroupInsert, CRUDUserGroup} from "../../models/crud-group";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SessionHttpService} from "../../services/connect/session-http.service";

@Component({
  selector: 'app-user-group-insert',
  templateUrl: './user-group-insert.component.html',
  styleUrls: ['./user-group-insert.component.scss']
})
export class UserGroupInsertComponent {

  data: CRUDGroupInsert = {authorities: [], name: ""}
  authorities: string[] = [];

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public internalData: CRUDUserGroup,
    private http:SessionHttpService) {
    this.http.get<string[]>('/info/authority',res=>{
      this.authorities = res
    })
    if (internalData!=null){
      this.data.name = internalData.name
      this.data.authorities = internalData.authorities
    }
  }


}

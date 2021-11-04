import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SessionHttpService} from "../../services/connect/session-http.service";
import {CrudData} from "../../models/crud-data";
import {CrudClient} from "../../models/crud-client";

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.scss']
})
export class ClientSelectorComponent {
  clients: CrudClient [] = []

  constructor(
    public dialogRef: MatDialogRef<ClientSelectorComponent>,
    private sHttp: SessionHttpService
  ) {
    this.updateUsers()
  }

  updateUsers() {
    this.sHttp.get<CrudData<CrudClient>>('/admin/client?index=0&size=99999', res => {
      this.clients = res.data
    })
  }

  closeClick() {
    this.dialogRef.close()
  }

  select(client: CrudClient) {
    this.dialogRef.close(client)
  }
}

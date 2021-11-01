import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CrudClient} from "../../models/crud-client";

@Component({
  selector: 'app-delete-view',
  templateUrl: './delete-view.component.html',
  styleUrls: ['./delete-view.component.scss']
})
export class DeleteViewComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteViewComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string) {
  }


}

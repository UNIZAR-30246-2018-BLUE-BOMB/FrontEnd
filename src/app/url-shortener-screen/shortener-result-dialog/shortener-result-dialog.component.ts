import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../url-shortener-screen.component";

export interface DialogData {
  uri: string;
}

@Component({
  selector: 'app-shortener-result-dialog',
  templateUrl: './shortener-result-dialog.component.html',
  styleUrls: ['./shortener-result-dialog.component.css'],

})
export class ShortenerResultDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ShortenerResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onCopyClick(): void {
      this.dialogRef.close();
    }
  
    onCloseClick(): void {
      this.dialogRef.close();
    }

}

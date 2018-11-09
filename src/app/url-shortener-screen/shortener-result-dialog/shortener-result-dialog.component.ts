import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

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

    /**
     * Executed when copy button is clicked
     */
    onCopyClick(): void {
      // TODO: Copy data.url to clipboard
      this.dialogRef.close();
    }
  
    /**
     * Executed when close button is clicked
     */
    onCloseClick(): void {
      this.dialogRef.close();
    }

}

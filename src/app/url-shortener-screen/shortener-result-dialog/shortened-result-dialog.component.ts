import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export interface DialogData {
  shortenedUrl: string;
  qrURL: string;
}

@Component({
  selector: 'app-shortener-result-dialog',
  templateUrl: './shortened-result-dialog.component.html',
  styleUrls: ['./shortened-result-dialog.component.css'],

})
export class ShortenedResultDialogComponent {

  qrReference: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<ShortenedResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  public sanitizer: DomSanitizer) {
    this.qrReference = sanitizer.bypassSecurityTrustResourceUrl(data.qrURL);
  }

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
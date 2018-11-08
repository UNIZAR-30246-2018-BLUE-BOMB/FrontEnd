import { Component, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShortenerResultDialogComponent } from "./shortener-result-dialog/shortener-result-dialog.component";
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-url-shortener-screen',
  templateUrl: './url-shortener-screen.component.html',
  styleUrls: ['./url-shortener-screen.component.css']
})
export class UrlShortenerScreenComponent {

  /**
   * Regular expression for URLs detection
   * Source: https://stackoverflow.com/questions/52017171/angular-material-url-validation-with-pattern
   */
  public urlRegExp = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi

  /**
   * Url input field's form control
   */
  public urlInputForm = new FormControl('', [Validators.required, Validators.pattern(this.urlRegExp)]);

  /**
   * Ads input field's form control
   */
  //public adsInputForm = new FormControl('', [Validators.pattern(this.urlRegExp)]);

  /**
   * Message shown in the shortener button
   */
  public buttonText = "ACORTAR";

  /**
   * Control if is shortener button enabled
   */
  public isShortenerButtonEnabled = true;

  /**
   * State of the check box
   */
  @Output()
  public includeAds = false;

  constructor(public dialog: MatDialog) { }

  /**
   * Function execuded when shorten url button is clicked
   */
  public shortenUrl(): void {
    this.urlInputForm.markAsTouched();

    if (this.urlInputForm.valid) {
      this.isShortenerButtonEnabled = false;
      this.buttonText = "PROCESANDO ...";

      // TODO: Call rest api
      setTimeout(ignore => {
        this.openDialog(this.urlInputForm.value);
      }, 2000);
    }
  }

  /**
   * Open a dialog and show the shorten uri and the qr code
   * @param shortedUri Shorten URI
   */
  private openDialog(shortedUri: String): void {
    // TODO: Pass correct image
    const dialogRef = this.dialog.open(ShortenerResultDialogComponent, {
      width: '350px',
      data: { uri: shortedUri }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.buttonText = "ACORTAR";
      this.isShortenerButtonEnabled = true;
    });
  }
}

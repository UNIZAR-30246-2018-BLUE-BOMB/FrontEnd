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
   * Author: https://stackoverflow.com/questions/52017171/angular-material-url-validation-with-pattern
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
   * State of the check box
   */
  @Output()
  public includeAds = false;

  constructor(public dialog: MatDialog) { }

  /**
   * Function execuded when shorten url button is clicked
   */
  public shortenUrl(): void {
    this.openDialog();
  }

  private openDialog(): void {
    // TODO: Do it 
    this.dialog.open(ShortenerResultDialogComponent, {
      width: '350px',
      data: { uri: "http://bluebomb.com/blue-bomb" }
    });
  }
}

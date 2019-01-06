import {Component} from '@angular/core';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {ShortenedResultDialogComponent} from './shortener-result-dialog/shortened-result-dialog.component';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ShortResponse} from '../models/shortResponse';
import {environment} from '../../environments/environment';

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
  public urlRegExp = /(^|\s)((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;

  /**
   * Url input field's form control
   */
  public urlInputForm = new FormControl('', [Validators.required, Validators.pattern(this.urlRegExp)]);

  /**
   * Ads input field's form control
   */
  public adsInputForm = new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern(this.urlRegExp)]);

  /**
   * Message shown in the shortener button
   */
  public buttonText = 'ACORTAR';

  /**
   * Control if is shortener button enabled
   */
  public isShortenerButtonEnabled = true;

  /**
   * Control if head no reachable error shown
   */
  public headNoReachableError = false;

  /**
   * Control if ads no reachable error shown
   */
  public adsNoReachableError = false;

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  /**
   * Function execuded when shorten url button is clicked
   */
  public onShortenUrlClick(): void {
    this.headNoReachableError = false;
    this.adsNoReachableError = false;

    // Control if adsInputForm is valid
    let adsInputFormValid = true;

    // Mark as touched used fields
    this.urlInputForm.markAsTouched();
    if (this.adsInputForm.enabled) {
      this.adsInputForm.markAsTouched();
      adsInputFormValid = this.adsInputForm.valid;
    }

    // Only open dialog if fields are corrects
    if (this.urlInputForm.valid && adsInputFormValid) {
      this.isShortenerButtonEnabled = false;
      this.buttonText = 'PROCESANDO ...';
      let path_to_search = environment.backEndURI + '/short';

      // Message to send in parameters
      if (this.adsInputForm.enabled) {
        path_to_search = path_to_search + '?headURL=' +
          this.urlInputForm.value + '&&interstitialURL=' +
          this.adsInputForm.value + '&&secondsToRedirect=10';

      } else {
        path_to_search = path_to_search + '?headURL=' + this.urlInputForm.value;
      }

      // Call rest api
      this.http.post<ShortResponse>(path_to_search, {}).subscribe((data: ShortResponse) => {
          this.openDialog(data.qrReferenceUrl, data.shortedUrl);
          console.log('Enviado');
        }, error => {
          this.buttonText = 'ACORTAR';
          this.isShortenerButtonEnabled = true;
          console.error(error.error.message);

          if (error.error.message === 'Ad URL is not reachable') {
            this.adsInputForm.markAsTouched();
            this.adsNoReachableError = true;
            this.adsInputForm.setErrors({});
          } else {
            this.urlInputForm.markAsTouched();
            this.headNoReachableError = true;
            this.urlInputForm.setErrors({});
          }
        }
      );
    }
  }

  /**
   * Open a dialog and show the shorten uri and the qr code
   * @param qrReferenceURL Shorten sequence base QR path
   * @param shortedURL Shorten URI
   */
  private openDialog(qrReferenceURL: String, shortedURL: String): void {
    const dialogRef = this.dialog.open(ShortenedResultDialogComponent, {
      width: '600px',
      data: {shortenedUrl: shortedURL, qrURL: qrReferenceURL}
    });

    dialogRef.afterClosed().subscribe(ignore => {
      this.buttonText = 'ACORTAR';
      this.isShortenerButtonEnabled = true;
    });
  }

  /**
   * Function executed when checkbox change
   * @param event checkbox event
   */
  public onCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.adsInputForm.enable();
    } else {
      this.adsInputForm.disable();
    }
  }
}

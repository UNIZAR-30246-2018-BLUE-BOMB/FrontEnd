import {Component} from '@angular/core';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CustomValidators} from 'ngx-custom-validators';
import {MatSnackBar} from '@angular/material';
import {ShortResponse} from '../models/shortResponse';
import {environment} from '../../environments/environment';
import {ShortenedResultDialogComponent} from './shortener-result-dialog/shortened-result-dialog.component';

@Component({
  selector: 'app-url-shortener-screen',
  templateUrl: './url-shortener-screen.component.html',
  styleUrls: ['./url-shortener-screen.component.css']
})
export class UrlShortenerScreenComponent {
  /**
   * Url input field's form control
   */
  public urlInputForm = new FormControl('', [Validators.required, CustomValidators.url]);

  /**
   * Ads input field's form control
   */
  public adsInputForm = new FormControl({value: '', disabled: true}, [Validators.required, CustomValidators.url]);

  /**
   * Message shown in the shortener button
   */
  public buttonText = 'ACORTAR';

  /**
   * Control if is shortener button enabled
   */
  public isShortenerButtonEnabled = true;

  constructor(public dialog: MatDialog, private http: HttpClient, public snackBar: MatSnackBar) {
  }

  /**
   * Function execuded when shorten url button is clicked
   */
  public onShortenUrlClick(): void {
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
      let path_to_search = environment.backEndURI
        + '/short'
        + '?headURL=' + this.urlInputForm.value;

      // Message to send in parameters
      if (this.adsInputForm.enabled) {
        path_to_search = path_to_search
          + '&&interstitialURL=' + this.adsInputForm.value
          + '&&secondsToRedirect=10';

      }

      // Call rest api
      this.http.post<ShortResponse>(path_to_search, {}).subscribe((data: ShortResponse) => {
          this.openDialog(data.qrReferenceUrl + '?height=250&width=250&margin=10', data.shortedUrl);
        }, error => {
          this.buttonText = 'ACORTAR';
          this.isShortenerButtonEnabled = true;

          if (error.error.message === 'Ad URL is not reachable') {
            this.snackBar.open('La url del anuncio introducido no es alcanzable', null, {
              duration: 3000
            });
          } else {
            this.snackBar.open('La url introducida no es alcanzable', null, {
              duration: 3000
            });
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
      width: '400px',
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

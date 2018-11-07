import {Component,  Output , OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ShortenerResultDialogComponent} from "./shortener-result-dialog/shortener-result-dialog.component";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-url-shortener-screen',
  templateUrl: './url-shortener-screen.component.html',
  styleUrls: ['./url-shortener-screen.component.css']
})
export class UrlShortenerScreenComponent implements OnInit {

  @Output()
  public includeAds = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  shortenUrl(): void{
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(ShortenerResultDialogComponent, {
      width: '350px',
      data: {uri: "http://bluebomb.com/blue-bomb"}
    });
  }
}

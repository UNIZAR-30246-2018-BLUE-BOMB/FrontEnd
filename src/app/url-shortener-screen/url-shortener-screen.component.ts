import {Component,  Output , OnInit} from '@angular/core';

@Component({
  selector: 'app-url-shortener-screen',
  templateUrl: './url-shortener-screen.component.html',
  styleUrls: ['./url-shortener-screen.component.css']
})
export class UrlShortenerScreenComponent implements OnInit {

  @Output()
  public includeAds = false;

  constructor() {
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent implements OnInit {

  shortenID: String = ""

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.shortenID = this.route.snapshot.paramMap.get('id');
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent implements OnInit {

  stompClient = null;

  shortenID: String = "";

  adsPage: SafeResourceUrl;

  timeoutRedirect: Number = 0;

  constructor(private route: ActivatedRoute, public sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.shortenID = this.route.snapshot.paramMap.get('id');
    this.connect(this.shortenID);
  }

  private connect(sequence: String) {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    var self = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      self.stompClient.subscribe('/user/queue/error/info', function (error) {
        console.log(error.body);
        // TODO: What do when errors come?
      });

      self.stompClient.subscribe('/user/info/' + sequence, function (message) {
        let headURL = JSON.parse(message.body).headURL;
        let interstitialURL = JSON.parse(message.body).interstitialURL;
        let secondsToRedirect = JSON.parse(message.body).secondsToRedirect;

        if(interstitialURL!=null && interstitialURL!=""){
          self.adsPage = self.sanitizer.bypassSecurityTrustResourceUrl(interstitialURL);
          self.timeoutRedirect = secondsToRedirect;
        }else if(headURL!=null && headURL!=""){
          self.redirectToURL(headURL);
        }
      });

      self.stompClient.send('/app/info', {}, sequence);
    });
  }

  private disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  private redirectToURL(newURL: string){
    this.disconnect();
   window.location.href = newURL;
  }
}

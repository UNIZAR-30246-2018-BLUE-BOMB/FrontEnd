import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent implements OnInit {

  stompClient = null;

  shortenID: String = '';

  adsPage: SafeResourceUrl;

  timeoutRedirect = 0;

  isProcessed = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.shortenID = this.activatedRoute.snapshot.paramMap.get('id');
    this.connect(this.shortenID);
  }

  private connect(sequence: String) {
    const socket = new SockJS(environment.backEndURI + '/ws');
    this.stompClient = Stomp.over(socket);
    const self = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      self.stompClient.subscribe('/user/queue/error/info', function (error) {
        self.router.navigate(['/error']);
      });

      self.stompClient.subscribe('/user/info/' + sequence, function (message) {
        const headURL = JSON.parse(message.body).headURL;
        const interstitialURL = JSON.parse(message.body).interstitialURL;
        const secondsToRedirect = JSON.parse(message.body).secondsToRedirect;

        if (interstitialURL != null && interstitialURL !== '') {
          self.adsPage = self.sanitizer.bypassSecurityTrustResourceUrl(interstitialURL);
          self.timeoutRedirect = secondsToRedirect;
          self.isProcessed = true;
          // Decrement timeoutRedirect
          const decrementTimeoutFunction = function () {
            if (self.timeoutRedirect > 0) {
              self.timeoutRedirect = self.timeoutRedirect - 1;
            }

            if (self.timeoutRedirect > 0) {
              setTimeout(decrementTimeoutFunction, 1000);
            }
          };
          setTimeout(decrementTimeoutFunction, 1000);

        } else if (headURL != null && headURL !== '') {
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

  private redirectToURL(newURL: string) {
    this.disconnect();
    window.location.href = newURL;
  }
}

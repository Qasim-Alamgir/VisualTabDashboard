import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  channel_message: any;
  AuthUser: any;

  constructor(
  ) {
    this.pusher = new Pusher(environment.PUSHER_KEY, {
      logToConsole: true,
      cluster: environment.PUSHER_CLUSTER,
      encrypted: true,
      forceTLS: true,
      // disableStats: true,
      authEndpoint : environment.apiUrl + 'pusherauth',
      auth: {
        headers: {
          'Authorization': "Bearer "+ localStorage.getItem('auth_token')
        }
      }
    });
    this.pusher.logToConsole = true;
    setTimeout(() => {
        this.channel = this.pusher.subscribe("private-App.User."+localStorage.getItem('UserId'));
        console.log(this.channel);
      }, 1000);
   }
}

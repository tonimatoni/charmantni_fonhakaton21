import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private fcm: AngularFireMessaging) {
    this.fcm.getToken
      .subscribe(
        (token) => { console.log('Permission granted! Save to the server!', token); },
        (error) => { console.error(error); },
      );
    this.fcm.onMessage((payload) => {
      console.log('Message received. ', payload);
      // ...
    });
  }
}

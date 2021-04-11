import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AuthService } from './auth/auth.service';
declare const window: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AuthService, private firestore: AngularFirestore, private fcm: AngularFireMessaging, private fsAuth: AngularFireAuth) {
    try {
      this.fsAuth.setPersistence('local');
      auth.getCurrentUser().then(currUser => {
        console.log(currUser);
        if (currUser)
          this.fcm.getToken
            .subscribe(
              async (token) => {
                await this.firestore.doc(`users/${currUser.id}`).set({
                  messagingToken: token
                }, { merge: true })
              },
              (error) => { console.error(error); },
            );
      })


      this.fcm.onMessage((payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Customize notification here
        const notificationTitle = 'Background Message Title';
        const notificationOptions = {
          body: 'Background Message body.',
          icon: '/firebase-logo.png'
        };
        var img = '/to-do-notifications/img/icon-128.png';
        var text = 'HEY! Your task "' + '" is now overdue.';
        var notification = new Notification('To do list', { body: text });
      })
    } catch (err) {
        console.log(err);
      }
    }
}
